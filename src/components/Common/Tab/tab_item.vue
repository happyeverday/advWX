<template>
  <div class="vux-tab-item" :class="[selected ? activeClass : '', {'vux-tab-selected': selected}]" :style="style" @click="onItemClick">
    <slot></slot>
  </div>
</template>

<script>
import { childMixin } from './multi_items'

export default {
  mixins: [childMixin],
  props: {
    activeClass: String
  },
  computed: {
    style () {
      return {
        borderWidth: this.$parent.lineWidth + 'px',
        borderColor: this.$parent.activeColor,
        color: this.selected ? this.$parent.activeColor : this.$parent.defaultColor,
        border: this.$parent.animate ? 'none' : 'auto'
      }
    }
  }
}
</script>
