<template>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <nav class="nav-breadcrumb">
          <a href="/">Home</a>
          <slot name="goods"></slot>
          <slot name="myCart"></slot>
          <slot name="address"></slot>
          <slot name="order"></slot>
        </nav>
      </div>
    </div>
</template>
