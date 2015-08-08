# WarJs
Javascript Framework



##Como usar

Adicione o arquivo warjs em seu projeto
<pre>
<script src="js/warjs.js"></script>
</pre>

inicie a variavel e o metodo mount();
<pre>
var war;
    $(document).ready(function () {

        war = new warjs();
        war.mount();
    });
</pre>


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

<pre>
data-war-shot="{point:'self',class:'animate',limit:'50',delay:'1000'}"
</pre>

<ul>
    <li>class - class adicionada no modo ativo</li>
    <li>target - elemento a ser alcançado  </li>
    <li>limit - limit para o target (target - limit)</li>
    <li>limitMove - valor a ser adicionado no scrollmove</li>
</ul>


## Size

<pre>
data-war-shot="{point:'self',class:'animate',limit:'50',delay:'1000'}"
</pre>

<ul>
    <li>height - altura do elemento / podemos utilizar variaveis</li>
    <li>width - largura do elemento / podemos utilizar variaveis </li>
    <li>limitH - tamanho maximo do elemento</li>
    <li>limitW - tamanho minimo do elemento</li>
</ul>



## War

<pre>
data-war-shot="{point:'self',class:'animate',limit:'50',delay:'1000'}"
</pre>

<ul>
    <li>height - altura do elemento / podemos utilizar variaveis</li>
    <li>width - largura do elemento / podemos utilizar variaveis </li>
    <li>limitH - tamanho maximo do elemento</li>
    <li>limitW - tamanho minimo do elemento</li>
</ul>