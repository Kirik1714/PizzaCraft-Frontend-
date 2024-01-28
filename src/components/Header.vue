<script setup></script>

<template>
    <header>
        <nav class="nav">
            <div class="nav_info_block">
                <div class="info_block_logo"><img src="../assets/images/logo.svg" alt=""></div>
                <div class="info_block_description">
                    <p class="info_block_title">VUE PIZZA</p>
                    <p class="info_block_subtitle">самая вкусная пицца во вселенной</p>
                </div>
            </div>
            <div class="nav_user_block">
                <div class="user_block_basket">
                    <div class="block_basket_price">100 ₽</div>
                    <div class="block_basket_split"></div>
                    <div class="block_basket_img"><img src="../assets/images/basket.svg" alt="">3</div>
                </div>
                <div class="user_block_account">
                    <img src="../assets/images/account.svg" alt="">
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss">
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:25px ;

    &_info_block {
        display: flex;
        gap: 17px;
    }
}


.nav_user_block {
    display: flex;
    align-items: center;
    gap: 15px;

}

.info_block_title {
    font-weight: 900;
    font-size: 22px;
}

.info_block_title {
    font-weight: 900;
    font-size: 22px;
}
.info_block_subtitle {
    font-size: 14px;
    color: gray;
}

.user_block_basket {
    display: flex;
    background-color: rgb(208, 246, 255);
    gap: 20px;
    border-radius: 25px;
    padding: 15px;

}

.block_basket_split {
    width: 1px;
    height: 25;
    background-color: black;
}

.block_basket_img {
    display: flex;
    gap: 4px;
}</style>