<template>
  <div style="border: 1px solid #ccc;">
<!--    <Toolbar-->
<!--        style="border-bottom: 1px solid #ccc"-->
<!--        :editor="editor"-->
<!--        :defaultConfig="toolbarConfig"-->
<!--        :mode="mode"-->
<!--    />-->
<!--    <Editor-->
<!--        style="height: 200px; overflow-y: hidden;"-->
<!--        v-model="html"-->
<!--        :defaultConfig="editorConfig"-->
<!--        :mode="mode"-->
<!--        @onCreated="onCreated"-->
<!--    />-->
<!--    wangeditor回显-->
<article
    id="write"
class="article-content markdown-body"
v-html="a"
ref="article"
>

</article>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import Clipboard from "clipboard";
// import hljs from 'highlight.js'
import 'highlight.js/styles/agate.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
name: "richContext",
  components: { Editor, Toolbar },
  data() {
    return {
      clipboard: null,
      a:"",
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: { },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          // 配置上传图片
          uploadImage: {
            server: '/api/upload',
            fieldName: 'custom-field-name',
            metaWithUrl: true,
          },
        },
      },
      mode: 'default', // or 'simple'
    }
  },
  methods: {
    markdownToHtml(article) {
      const MarkdownIt = require("markdown-it");
      const hljs = require("highlight.js");
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function(str, lang) {
          // 当前时间加随机数生成唯一的id标识
          var d = new Date().getTime();
          if (
              window.performance &&
              typeof window.performance.now === "function"
          ) {
            d += performance.now();
          }
          const codeIndex = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
              }
          );
          // 复制功能主要使用的是 clipboard.js
          let html = `<button class="copy-btn iconfont iconfuzhi" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}"></button>`;
          const linesLength = str.split(/\n/).length - 1;
          // 生成行号
          let linesNum = '<span aria-hidden="true" class="line-numbers-rows">';
          for (let index = 0; index < linesLength; index++) {
            linesNum = linesNum + "<span></span>";
          }
          linesNum += "</span>";
          if (lang && hljs.getLanguage(lang)) {
            // highlight.js 高亮代码
            const preCode = hljs.highlight(lang, str, true).value;
            html = html + preCode;
            if (linesLength) {
              html += '<b class="name">' + lang + "</b>";
            }
            // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "<" 代替，不影响复制功能
            return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
                /<\/textarea>/g,
                "</textarea>"
            )}</textarea>`;
          }
        }
      });
      // 将markdown替换为html标签
      this.a = md.render('2(index):59 <h1>发多少防守打法</h1><h2>发多少防守打法但是</h2><h3>发多少顺丰到付</h3><h4>发多少防守打法</h4><p><br></p><pre><code class="language-java">{\n' +
          '    "mappings": {\n' +
          '            "properties": {\n' +
          '                "id": {\n' +
          '                    "type": "integer"\n' +
          '                },\n' +
          '                "articleTitle": {\n' +
          '                    "type": "text",\n' +
          '                    "analyzer": "ik_max_word"\n' +
          '                },\n' +
          '                "articleContent": {\n' +
          '                    "type": "text",\n' +
          '                    "analyzer": "ik_max_word"\n' +
          '                },\n' +
          '                "isDelete": {\n' +
          '                    "type": "integer"\n' +
          '                },\n' +
          '                "status": {\n' +
          '                    "type": "integer"\n' +
          '                }\n' +
          '            }\n' +
          '      }\n' +
          '}</code></pre><p><br></p>'
      );
      // this.article = article;
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错

      console.log("@s",this.editorConfig)

      // this.editor.customConfig.uploadImgServer = '/up load'
    },
  },
  mounted() {
    this.a = '<p>防守打法胜多负少的防守打法水电费萨达</p><pre><code class="language-java">package com.ruoyi.web.entity;\n' +
        '\n' +
        'import com.baomidou.mybatisplus.annotation.IdType;\n' +
        'import com.baomidou.mybatisplus.annotation.TableId;\n' +
        'import com.baomidou.mybatisplus.annotation.TableLogic;\n' +
        'import io.swagger.annotations.ApiModelProperty;\n' +
        'import io.swagger.annotations.ApiOperation;\n' +
        'import lombok.Data;\n' +
        'import lombok.EqualsAndHashCode;\n' +
        '\n' +
        'import java.time.LocalDateTime;\n' +
        '\n' +
        '@Data\n' +
        '@EqualsAndHashCode\n' +
        'public class ArticleTpl {\n' +
        '    @TableId(value = "id",type = IdType.AUTO)\n' +
        '    private int id;\n' +
        '    @ApiModelProperty("封面图")\n' +
        '    private String photo;\n' +
        '    @ApiModelProperty("文章的分类")\n' +
        '    private String type;\n' +
        '    @ApiModelProperty("文章的作者")\n' +
        '    private String author;\n' +
        '    @ApiModelProperty("文本内容")\n' +
        '    private String context;\n' +
        '    @ApiModelProperty("创建时间")\n' +
        '    private LocalDateTime createTime;\n' +
        '    @ApiModelProperty("更新时间")\n' +
        '    private LocalDateTime updateTime;\n' +
        '    @TableLogic\n' +
        '    private int isDelete;\n' +
        '    @ApiModelProperty("是否置顶")\n' +
        '    private int isTop;\n' +
        '    @ApiModelProperty("文章标题")\n' +
        '    private String title;\n' +
        '}\n' +
        '</code></pre><p><br></p>'
    this.$nextTick(()=>{
      var aa = this.$refs.article.children
      for (let i = 0; i < aa.length; i++) {

        if(aa[i].tagName == 'PRE'){
          console.log(aa[i].classList.add('hljs'))
          // aa[i].style.fontSize = '15px'
          // aa[i].style.backgroundColor = 'RGB(38,42,49)';
          // aa[i].children[0].style.color = 'white'
        }

      }
    })
    this.clipboard = new Clipboard(".copy-btn");
    // 模拟 ajax 请求，异步渲染编辑器
    setInterval(() => {
      // this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
      console.log(this.html)
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>
<style>
</style>
<style lang="scss">
pre.hljs {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
  &:hover .copy-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  code {
    display: block !important;
    margin: 0 10px !important;
    overflow-x: auto !important;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #666;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background: #1e1e1e;
    }
    &::-webkit-scrollbar-track-piece {
      background: #1e1e1e;
      width: 6px;
    }
  }
  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 12px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, 0.66);
    user-select: none;
    counter-reset: linenumber;
    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }
  b.name {
    position: absolute;
    top: 7px;
    right: 45px;
    z-index: 1;
    color: #999;
    pointer-events: none;
  }
  .copy-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 1;
    color: #ccc;
    background-color: #525252;
    border-radius: 6px;
    display: none;
    font-size: 14px;
    width: 32px;
    height: 24px;
    outline: none;
  }
}
</style>
<style scoped>
.article-content {
  word-break: break-word;
  font-size: 14px;
  line-height: 2;
}
</style>
