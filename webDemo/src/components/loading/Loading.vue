<template>
    <div id="loading">
        <div class="loading-style-4">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "loading"
}
</script>
<style lang="scss" scoped>
#loading{
    position: absolute;
    left: 0;
    top: 170px;
    z-index: 1000;
    background: rgba(246, 250, 249, 0.945);
    width: 100%;
    height: 100%;
}
.loading-style-4{
    width: 100px;
    height: 100px;
    position: relative;
    margin: 200px auto;
}
.loading-style-4 span{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #8AC78F;
    position: absolute;
    -webkit-animation: loading-style-4 1.04s ease-in-out infinite;
    -moz-animation: loading-style-4 1.04s ease-in-out infinite;
    -ms-animation: loading-style-4 1.04s ease-in-out infinite;
    -o-animation: loading-style-4 1.04s ease-in-out infinite;
    animation: loading-style-4 1.04s ease-in-out infinite;
    }
    @-webkit-keyframes loading-style-4{
    0%{
    -webkit-transform: scale(1.2);
    opacity: 1;
}
100%{
    -webkit-transform: scale(.3);
    opacity: 0.5;
}
}
@-moz-keyframes loading-style-4{
    0%{
    -moz-transform: scale(1.2);
    opacity: 1;
    }
    100%{
    -moz-transform: scale(.3);
    opacity: 0.5;
    }
    }
    @-ms-keyframes loading-style-4{
    0%{
    -ms-transform: scale(1.2);
    opacity: 1;
    }
    100%{
    -ms-transform: scale(.3);
    opacity: 0.5;
    }
    }
    @-o-keyframes loading-style-4{
    0%{
    -o-transform: scale(1.2);
    opacity: 1;
    }
    100%{
    -o-transform: scale(.3);
    opacity: 0.5;
    }
    }
    @keyframes loading-style-4{
    0%{
    transform: scale(1.2);
    opacity: 1;
    }
    100%{
    transform: scale(.3);
    opacity: 0.5;
    }
}
.loading-style-4 span:nth-child(1){
left: 0;
top: 50%;
margin-top:-10px;
-webkit-animation-delay:0.13s;
-moz-animation-delay:0.13s;
-ms-animation-delay:0.13s;
-o-animation-delay:0.13s;
animation-delay:0.13s;
}
.loading-style-4 span:nth-child(2){
left: 14px;
top: 14px;
-webkit-animation-delay:0.26s;
-moz-animation-delay:0.26s;
-ms-animation-delay:0.26s;
-o-animation-delay:0.26s;
animation-delay:0.26s;
}
.loading-style-4 span:nth-child(3){
left: 50%;
top: 0;
margin-left: -10px;
-webkit-animation-delay:0.39s;
-moz-animation-delay:0.39s;
-ms-animation-delay:0.39s;
-o-animation-delay:0.39s;
animation-delay:0.39s;
}
.loading-style-4 span:nth-child(4){
top: 14px;
right:14px;
-webkit-animation-delay:0.52s;
-moz-animation-delay:0.52s;
-ms-animation-delay:0.52s;
-o-animation-delay:0.52s;
animation-delay:0.52s;
}
.loading-style-4 span:nth-child(5){
right: 0;
top: 50%;
margin-top:-10px;
-webkit-animation-delay:0.65s;
-moz-animation-delay:0.65s;
-ms-animation-delay:0.65s;
-o-animation-delay:0.65s;
animation-delay:0.65s;
}
.loading-style-4 span:nth-child(6){
right: 14px;
bottom:14px;
-webkit-animation-delay:0.78s;
-moz-animation-delay:0.78s;
-ms-animation-delay:0.78s;
-o-animation-delay:0.78s;
animation-delay:0.78s;
}
.loading-style-4 span:nth-child(7){
bottom: 0;
left: 50%;
margin-left: -10px;
-webkit-animation-delay:0.91s;
-moz-animation-delay:0.91s;
-ms-animation-delay:0.91s;
-o-animation-delay:0.91s;
animation-delay:0.91s;
}
.loading-style-4 span:nth-child(8){
bottom: 14px;
left: 14px;
-webkit-animation-delay:1.04s;
-moz-animation-delay:1.04s;
-ms-animation-delay:1.04s;
-o-animation-delay:1.04s;
animation-delay:1.04s;
}
</style>

