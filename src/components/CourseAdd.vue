<template>
  <div>
    <!--用户输入-->
    <p>
      <input
        type="text"
        :value="value"
        @input="onInput"
        v-on:keydown.enter="addCourse"
        ref="inp"
        v-focus
        class="inp"
      />
      <button @click="addCourse">新增</button>
    </p>
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    addCourse() {
      //派发事件通知父组件新增课程
      this.$emit("add-course");
    },
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },
  // mounted() {
  //     this.$refs.inp.focus();
  // },
};
</script>

<style lang="scss" scoped>
.inp {
  margin: 5px;
}
</style>