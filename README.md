# WarJs
Javascript Framework - 



##Como usar

Adicione o arquivo warjs em seu projeto
<pre>
&lt;script src="js/warjs.min..js"&gt;&lt;/script&gt;
</pre>

ou 

```html
bower install warjs
```

inicie a variavel e o metodo mount();
```javascript
var war;
    $(document).ready(function () {

        war = new warjs();
        war.mount();
    });
```


Principais funcionalidades

## Shot

<pre>
data-war-shot="{point:'self',class:'animate',limit:'50',delay:'1000'}"
</pre>

<ul>
    <li>Point - numero referente a rolagem ou use self para pegar o top do elemento</li>
    <li>Limit - numero que vai </li>
    <li>Delay - tempo de espera para executar a ação</li>
    <li>Name - o nome da class ou função</li>
    <li>Type - addClass, removeClass ou function</li>
</ul>


## Menu

```html
<a href="#" data-war-menu="{target:'#quemsomos',limit:100,limitMove:100}">Quem Somos</a>
```

<ul>
    <li>class - class adicionada no modo ativo</li>
    <li>target - elemento a ser alcançado  </li>
    <li>limit - limit para o target (target - limit)</li>
    <li>limitMove - valor a ser adicionado no scrollmove</li>
</ul>


## Size

```html
<section class="page home" data-war-size="{height:'$screenHeight',limitH:'600'}">
</section>
```

<ul>
    <li>height - altura do elemento / podemos utilizar variaveis</li>
    <li>width - largura do elemento / podemos utilizar variaveis </li>
    <li>limitH - tamanho minimo do elemento</li>
    <li>limitW - tamanho minimo do elemento</li>
</ul>



## War

<pre>
data-war="{ toplimit:'true', animate:['background-position-y',[0,100],['0','30'],'px']}"
</pre>

<ul>
    <li>toplimit - muda o limitador inicial do elemento</li>
    <li>bottomlimit - muda o limitador final do elemento</li>
    <li>width - largura do elemento / podemos utilizar variaveis </li>
    <li>parent - id do elemento pai caso tenha / os limitadores passam a ser o do parent</li>
    <li>debug - true / false - exibe os limitadores </li>
</ul>



#Variaveis

$screenHeight;
$screenWidth;
$parentWidth;
$parentHeight;
$parentWidthIn;
$parentHeightIn;