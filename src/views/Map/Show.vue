<template>
    
</template>
<script>
export default {
    mounted(){
        location.href = 'https://gis.tsleem.com.sa?token='+localStorage.getItem('accessToken')
    }
}
</script>