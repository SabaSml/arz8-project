<template>
  <nav
    class="nav-style flex sm:flex-row justify-between items-center p-3 sm:p-2 mb-12 text-black w-full shadow-md"
  >
    <span class="nav-style--title py-4 sm:mx-2 text-center sm:text-left">Where in the world?</span>
    <button class="flex items-center nav-style--button mx-20 sm:mx-2">
      <font-awesome-icon :icon="['fas', 'moon']" class="nav-style--icon p-1 px-2 sm:px-1" />
      <p class="nav-style--text sm:ml-1 ml-2">Dark Mode</p>
    </button>
  </nav>
</template>

<style lang="scss">
.nav-style {
  background-color: rgb(255, 255, 255);

  &--title {
    font-weight: 900;
    font-size: 22px;
    margin-left: 5rem;
  }
  &--text {
    font-weight: 900;
    font-size: 16px;
  }
  &--button {
    margin-right: 5rem;
  }

  @media (max-width: 466px) {
    padding: 20px 0px;
    margin-bottom: 1rem;
    &--title {
      font-size: 17px;
      margin-left: 1rem;
      padding: 0.5rem 0rem;
    }
    &--text {
      font-size: 11px;
    }
    &--icon {
      padding: 0;
    }
    &--button {
      margin-right: 1rem;
    }
  }
}
</style>
