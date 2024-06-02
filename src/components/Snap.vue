<template>
  <div class="gallery-container">
    <div class="section-container">
      <div class="section-container">
        <section class="section">
          <img v-for="j in 4" :key="j" :src="getImageUrl(j)" class="gallery-image" @click="handleClick($event)" />
        </section>
      </div>
    </div>
    <div class="display-image"></div>
  </div>
</template>

<style scoped>
.section-container{
  width:100%;
  height:100vh;
  margin:0px;
  padding:0px;
  align-items: center; 
  justify-content: center;
  background-color:blue;
}
section{
  width:50%;
  height:100vh;
  scroll-snap-align:start;
  scroll-snap-stop: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:25%;
  
}
.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.gallery-image {
  width: 25%; 
  height:25%;
  margin:0px;
  /* padding:10px; */
  box-sizing: border-box; 
  background-color: #f0f0f0;
}

.section1{
  background-color: red;
}


</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Flip } from 'gsap/Flip';
import gsap from 'gsap';

const expandedElement = ref<HTMLElement | null>(null);
const placeholder = ref<HTMLDivElement | null>(null);
const isClickable = ref(true); // クリック可能かどうかを追跡する変数

onMounted(() => {
  gsap.registerPlugin(Flip);
});

const handleClick = (event: MouseEvent, ) => {
  if (!isClickable.value) return; // クリックが無効な場合は処理を中断

  const element = event.target as HTMLElement;
  if (expandedElement.value && expandedElement.value !== element) {
    return;
  }
  const currentState = Flip.getState(element);
  const isExpanded = element.dataset.expanded === 'true';
  

  isClickable.value = false; // アニメーション中はクリックを無効にする

  if (!isExpanded) {
    document.body.style.overflow = 'hidden';
    // プレースホルダーを作成して元の要素の後に挿入
    placeholder.value = document.createElement('div');
    placeholder.value.className = 'placeholder';
    placeholder.value.style.width = `25%`;
    placeholder.value.style.height = `25%`;
    if (element.parentNode && placeholder.value) {
      element.parentNode.insertBefore(placeholder.value, element.nextSibling);
    }

    // 拡大する
    element.style.position = 'fixed';
    element.style.zIndex = '1000';
    element.style.width = '80%';
    element.style.height = '80%';
    element.dataset.expanded = 'true';
    expandedElement.value = element;
  } else {
    document.body.style.overflow = '';

    // 元のスタイルに戻す
    element.style.width = '';
    element.style.height = '';
    element.style.position = '';
    element.style.zIndex = '';
    element.dataset.expanded = 'false';
    expandedElement.value = null;
  }


  // Flip.fromを使用してアニメーション
  Flip.from(currentState, {
    duration: 1,
    ease: "power1.inOut",
    absolute: true,
    onComplete: () => {
      if (!isExpanded) {
        element.style.left = '10%';
        element.style.top = '10%';
      } else {
        element.style.left = '';
        element.style.top = '';
        // プレースホルダーを削除
        if (placeholder.value && placeholder.value.parentNode) {
          placeholder.value.parentNode.removeChild(placeholder.value);
          placeholder.value = null;
        }
      }
      isClickable.value = true; // アニメーションが完了したらクリックを再度有効にする
    }
  });
};

const getImageUrl = ( j: number): string => {
  return new URL(`../assets/${j}.png`, import.meta.url).href;
};
</script>
