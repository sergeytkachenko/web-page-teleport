<template>
  <div class="hello">
    <h1 style="visibility: hidden;">
		<span>{{ msg }}</span>
	</h1>
    <div>
      <a href="javascript:void(0)" @click="enable">enable interactive mode</a>
    </div>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank"
             rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank"
             rel="noopener">typescript</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank"
             rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank"
             rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank"
             rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a>
      </li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { documentPack, documentUnpack } from "@/lib/page-reconstruction";

@Component({

})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  async enable() {
    const viewElements = documentPack();
    const ev = await documentUnpack({
      screenshotSrc: 'https://storage.elasticdata.io/5d97e3d304d18f0001adf90c/f1b73c80-0666-4333-8499-f49c5bfc5f27.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=elasticdataio%2F20201206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201206T152956Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3aa2f18c144879ea0bb38dca05eb23344653b6cc0084ff58418871e4c9694c76',
      width: 1920,
      height: 1080,
      toElement: document.body,
      viewElements: viewElements,
    });
    ev.onLeftClick((e) => console.log(e))
    ev.onRightClick((e) => {
		console.log(e)
		e.originEvent.preventDefault();
		e.originEvent.stopPropagation();
	})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
