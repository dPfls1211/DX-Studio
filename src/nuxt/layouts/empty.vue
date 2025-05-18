<template>
  <main class="d-flex flex-column">
    <nuxt />
  </main>
</template>

<script>
export default {
  async middleware({ store, $auth, route, redirect }) {
    // 로그인 되어있으면 serviceId 초기화
    if ($auth.loggedIn) {
      // 로그인 정보가 올바르지 않으면 로그아웃
      if (!$auth.user.serviceId || !$auth.user.serviceLabel) {
        await this.$auth.logout()

        this.$store.commit('viewtrack/reset')

        await this.$nextTick()

        return this.$router.push({ path: '/login' })
      }

      store.commit('viewtrack/setCurrentServiceInfo', $auth.user)
    }

    // 서비스별 로그인 페이지일 경우
    if (/\/(?:([^/]+?))\/login\/?$/.test(route.path)) {
      // 로그인 된 상태라면 설정된 홈으로 강제 이동
      if ($auth.loggedIn) {
        const [path, query] = decodeURIComponent(route.query.from ?? '').split('?')

        // 서비스 선택 화면에서 넘어온 것이 아닐 경우만 리다이렉트
        if (path && !/^\/login\/?$/.test(path)) return redirect(`${path}${query ? `?${query}` : ''}`)
        return redirect($auth.user.properties.home ?? '/')
      }

      // 없을 경우에는 서비스별 로그인 진행
    }
    // 서비스 선택 화면의 경우
    else if (/^\/login\/?$/.test(route.path)) {
      if ($auth.loggedIn) {
        const [path, query] = decodeURIComponent(route.query.from ?? '').split('?')

        // 넘어온 주소 정보가 있다면 이동
        if (path) return redirect(`${path}${query ? `?${query}` : ''}`)

        // 넘어온 주소 정보가 있다면 이동
        return redirect($auth.user.properties.home ?? '/')
      }

      // 로그인되어 있지 않다면 서비스 선택 화면 표시
    }
  },
  errorCaptured(err, vm, info) {
    console.error(err)

    const { isAxiosError, code, message, response: { status, statusText, data } = {} } = err

    const isNeedLogin = 401 === status

    if (isNeedLogin && '/login' === this.$route.path) return

    const icon = 'error'
    const msg = this.$i18n.t(data || message)

    const buttons = [{ text: isNeedLogin ? '로그인' : '확인', value: true }]
    if (isAxiosError) {
      return this.axiosErrorHandler({
        title: `코드: ${status || code}${statusText ? ` ${statusText}` : ''}`,
        icon,
        msg,
        closable: false,
        buttons,
        result: () => this.routeChangeByStatus({ isNeedLogin }),
      })
    }

    // mounted not show error message popup
    const isMountedError = 'mounted hook (Promise/async)'.includes(info)

    if (!isMountedError && this.stateConfigIsDev) {
      this.$messager.alert({
        title: code ? `코드 [${code}]` : '예기치 못한 오류',
        icon,
        msg,
        closable: false,
        buttons,
        result: () => this.routeChangeByStatus({ isNeedLogin }),
      })
    }

    return false
  },
  methods: {
    axiosErrorHandler({ title, icon, msg }) {
      try {
        if (Array.isArray(msg) || (!(msg instanceof Function) && msg instanceof Object))
          return this.$messager.alert({ title, icon, msg: JSON.stringify(msg, true, 2), panelCls: 'messager alert' })
      } catch {
        // Ignore Errors
      }

      this.$messager.alert({ title, icon, msg, panelCls: 'messager alert' })
    },
    async routeChangeByStatus({ isNeedLogin }) {
      if (isNeedLogin) {
        if (this.authLoggedIn) this.$nuxt.$emit('logout')
        else this.$router.push({ path: '/login' })
      }
    },
  },
}
</script>
