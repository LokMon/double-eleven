<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
html{
  font-size:calc(100vw/7.5);
  margin: auto;
}

@media screen and (min-width: 750px) {
  html {
    font-size: calc(677px/7.5);
    max-width: 677px;
  }
}
img{
  max-width: 100%;
  vertical-align: top;
}
input{
  border: none
}
button{
  border: none;
}
p{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
