<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link :to="{ name: 'Libreria' }">La tua libreria</router-link>
    </div>
    <router-view />
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#nav {
    text-align: center;
    padding: 30px;

    a.router-link-exact-active {
        font-size: 48px;
    }
}

// transitions
.fade-enter-from {
    opacity: 0;
    transform: translateY(60px);
}
.fade-enter-active {
    transition: all 1s ease;
}

.noti-enter-from {
    opacity: 0;
    transform: translateY(-60px);
}
.noti-enter-active {
    transition: all 1s ease;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
