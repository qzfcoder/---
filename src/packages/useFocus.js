import { computed } from "vue";
export function useFocus(data,callback){
  const blockMousedown = (e, block) => {
    e.preventDefault();
    e.stopPropagation();
    // 在block上规划一个属性focus 获取焦点后就将focus变为true
    if (e.shiftKey) {
      block.focus = !block.focus;
    } else {
      if (!block.focus) {
        clearBlockFocus();
        block.focus = true; // 要清空其他的选择
      } else {
        block.focus = false;
      }
    }
    callback(e)
  };
  const clearBlockFocus = () => {
    data.value.blocks.forEach((block) => (block.focus = false));
  };
  const focusData = computed(() => {
    let focus = [];
    let unfocused = [];
    data.value.blocks.forEach((block) =>
      (block.focus ? focus : unfocused).push(block)
    );
    return {focus, unfocused}
  });
  const containerMousedown = () => {
    clearBlockFocus();
  };

  return {
    blockMousedown,focusData,containerMousedown
  }
}