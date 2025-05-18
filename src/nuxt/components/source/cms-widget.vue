<template>
  <component
    :is="panelComponentClass"
    v-show="!computedDisabledWidget"
    :id="panel._id"
    ref="panel"
    v-Draggable="draggableOptions"
    v-Resizable="resizableOptions"
    class="vt-cms-panel"
    v-bind="panelProps"
    :class="{ selected, 'position-absolute': !gridPaint }"
    :style="panelPaint"
    @load="onCmsPanelLoad"
    @mounted="onCmsPanelMounted"
    @closeWidget="closeWidget"
  >
    <template #body>
      <component
        :is="componentClass"
        v-if="hasType"
        :id="componentId"
        ref="component"
        :key="componentKey"
        class="vt-cms-cmpt"
        v-bind="componentProps"
        :_sources="sources"
        :current-assets="currentAssets"
        :current-features="currentFeatures"
        @mounted="onCmsComponentMounted"
        @load="onCmsComponentLoad"
      />
    </template>

    <ul v-if="authIsSysadmin" class="vt-cms-panel-admin-tools m-0 user-select-none list-unstyled p-2 f-row justify-content-between" @click="onClickPanelTools">
      <div class="d-flex">
        <li class="vt-cms-panel-admin-tools-item vt-cms-panel-drag-handle m-1" @contextmenu.stop.prevent>
          <v-icon dark>mdi-cursor-move</v-icon>
        </li>

        <li class="vt-cms-panel-admin-tools-item f-animate g-text-error--hover m-1" @click="componentReload">
          <v-icon dark>mdi-reload</v-icon>
        </li>
      </div>
      <li class="vt-cms-panel-admin-tools-item f-animate g-text-error--hover m-1" @click="onClickDeleteComponent">
        <v-icon dark>mdi-trash-can-outline</v-icon>
      </li>
    </ul>
  </component>
</template>

<script>
export default {
  props: {
    userMode: { type: Boolean, default: false },
    gridPaint: { type: Boolean, default: false },
    panel: { type: Object, default: () => ({ type: 'panel-plain', _id: '', props: { css: '' } }) },
    draggable: { type: Boolean, default: false },
    resizable: { type: Boolean, default: false },
    resizableHandles: { type: String, default: 'e,s,ne,se,sw' },

    type: { type: String, default: null },
    paint: { type: Object, default: () => ({}) },
    componentId: { type: String, default: '' },
    componentProps: { type: Object, default: () => ({}) },
    selected: { type: Boolean, default: false },
    sources: { type: Object, default: () => ({}) },
    currentAssets: { type: Object, default: () => ({}) },
    currentFeatures: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      $viewer: null,
      $component: null,
      $panel: null,
      paintSrc: {},
      componentKey: 0,
      disabled: false,
    }
  },
  computed: {
    computedDisabledWidget() {
      if (this.authIsSysadmin) return false
      return this.disabled
    },
    draggableOptions() {
      if (this.authIsSysadmin && this.draggable) return { handle: '.vt-cms-panel-drag-handle', drag: this.onDragEvent, dragEnd: this.onDragEnd }
      return { disabled: true }
    },
    resizableOptions() {
      if (this.authIsSysadmin && this.resizable) return { handles: this.resizableHandles, minWidth: 50, minHeight: 50, edge: 10, resizeStop: this.onResizeStop }
      return { disabled: true }
    },
    authIsSysadmin() {
      if (this.userMode) return false
      return this.$auth.user?.properties?.isSysadmin
    },
    hasType() {
      return !!this.type
    },
    componentClass() {
      if (!this.hasType) return null

      try {
        return require(`~/components/${this.type}`).default
      } catch {
        return null
      }
    },
    panelPaint() {
      if (this.gridPaint) return {}

      const { x, y, w, h, ...paint } = JSON.parse(JSON.stringify(this.paint))
      const arithmetic = ['+', '-', '/', '*']
      const _paint = Object.entries(paint).reduce((acc, [key, _value]) => {
        let value = _value
        arithmetic.forEach(item => {
          if ((_value === 0 || _value) && !_value.includes('calc') && _value.includes(item)) {
            const noSpaceValue = _value.replace(/ /g, '')
            const splitValue = noSpaceValue.split(item)
            if (splitValue.length === 2) value = `calc(${splitValue[0]} ${item} ${splitValue[1]})`
          }
        })
        acc[key] = value
        return acc
      }, {})
      return { ...this.paintSrc, ..._paint }
    },
    panelProps() {
      return this.panel?.props ?? {}
    },
    panelComponentClass() {
      try {
        return require(`~/components/panel/${this.panel?.type}`).default
      } catch {
        return null
      }
    },
  },
  async mounted() {
    await this.$nextTick()

    this.appendCss()

    this.$emit('mounted', { instance: this })
  },
  methods: {
    closeWidget() {
      this.$emit('closeWidget')
      this.disable()
    },
    appendCss() {
      const { css } = this.panelProps
      if (!css) return

      const { _id } = this.panel
      if (!_id) return

      const styleElement = this.$el.querySelector(`style#${_id}`)

      const style = document.createElement('style')
      style.setAttribute('id', _id)
      style.setAttribute('type', 'text/css')
      style.setAttributeNode(document.createAttribute('scoped'))

      const textNodes = [document.createTextNode(css)]
      textNodes.forEach(textNode => style.appendChild(textNode))

      if (!styleElement) return this.$el.appendChild(style)
      styleElement.replaceWith(style)
    },
    onCmsPanelMounted({ instance }) {},
    onCmsPanelLoad({ instance }) {
      instance.setWidget({ instance: this })
    },
    onCmsComponentMounted({ instance }) {},
    onCmsComponentLoad({ instance }) {
      instance.setWidget({ instance: this })
    },
    setPanel({ instance }) {
      this.$panel = instance
      if (this.$component) instance.setComponent({ instance: this.$component })
      if (this.$viewer) instance.setViewer({ instance: this.$viewer })
    },
    setComponent({ instance }) {
      this.$component = instance
      if (this.$viewer) this.$viewer.addComponent({ instance })
      if (this.$panel) this.$panel.setComponent({ instance })
    },
    setViewer({ instance }) {
      this.$viewer = instance
      if (this.$component) instance.addComponent({ instance: this.$component })
      if (this.$panel) this.$panel.setViewer({ instance })
    },
    onResizeStop({ width, height }) {
      this.$emit('resize-widget', { width, height, componentId: this.componentId })
    },
    onResize({ clientWidth, clientHeight, width, height }) {
      let widthInPercent = Math.round((width / clientWidth) * 100)
      let heightInPercent = Math.round((height / clientHeight) * 100)
      const paint = JSON.parse(JSON.stringify(this.paint))
      this.paintSrc = { ...this.paintSrc, ...paint, width: `${widthInPercent}%`, height: `${heightInPercent}%` }
      this.$emit('paint', this.paintSrc)
    },
    onDragEvent($event) {
      // draggable containment area to "viewer"
      if ($event.left < 0) $event.left = 0
      if ($event.top < 0) $event.top = 0

      const { clientWidth: eventClientWidth, clientHeight: eventClientHeight } = $event.target.$el
      const { clientWidth: containerClientWidth, clientHeight: containerClientHeight } = this.$viewer.$el

      if ($event.left + eventClientWidth > containerClientWidth - 2) $event.left = containerClientWidth - 2 - eventClientWidth
      if ($event.top + eventClientHeight > containerClientHeight - 4) $event.top = containerClientHeight - 4 - eventClientHeight

      $event.target.applyDrag()
    },
    onDragEnd({ top, left }) {
      this.$emit('drag-widget', { top, left, componentId: this.componentId })
    },
    onDrag({ clientWidth, clientHeight, top, left }) {
      let topInPercent = Math.round((top / clientHeight) * 100)
      let leftInPercent = Math.round((left / clientWidth) * 100)

      const paint = JSON.parse(JSON.stringify(this.paint))
      this.paintSrc = { ...this.paintSrc, ...paint, left: `${leftInPercent}%`, top: `${topInPercent}%` }
      this.$emit('paint', this.paintSrc)
    },
    onClickPanelTools() {
      this.$emit('select')
    },
    onClickDeleteComponent() {
      this.$emit('delete')
    },
    async componentReload() {
      this.componentKey++

      await this.$nextTick()

      this.$refs.component.setViewer({ viewer: this.$viewer })
    },
    disable() {
      this.disabled = true
    },
    enable() {
      this.disabled = false
    },
  },
}
</script>
