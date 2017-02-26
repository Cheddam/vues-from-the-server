<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <nuxt-link class="nav-item" active-class="is-active" to="/">For'm</nuxt-link>
        <nuxt-link class="nav-item is-tab" active-class="is-active" to="/boards">Boards</nuxt-link>
        <nuxt-link class="nav-item is-tab" active-class="is-active" to="/roster">Roster</nuxt-link>
      </div>

      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu">
        <nuxt-link class="nav-item is-tab" active-class="is-active" to="/register">Register</nuxt-link>
      </div>
    </div>
  </nav>
</template>
