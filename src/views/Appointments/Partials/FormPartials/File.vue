<template>
    <div class="d-flex">
        <div class="position-relative  mx-3" v-for="(attach, i) in data.attach.attachements" :key="i">
            <a
                :href="attach.path"
                target="_blank"
                class="box-file"
            >
                <!-- <v-icon size="25" class="text-dark rotate-180"
                >fas fa-file-pdf</v-icon
                > -->
                <img :src="attach.path" class="attach-answer"/>
            </a>
            <button type="button" aria-label="clear icon" @click="removeAttach(attach,data.attach)" tabindex="-1" class="btn-close v-icon notranslate v-icon--link  fas fa-times-circle theme--light"></button>
        </div>
    </div>
</template>
<script>

export default{
    name: "File",
    props: ["data"],
    components:{
    },
    data() {
        return {
        }
    },
    methods: {
        removeAttach1(id){
            return axios.delete('general/forms/delete-answer-attach/'+id).then(
                    (response) => {
                        console.log(response);
                        this.$store.commit('form/SET_NOTIFY', {
                            msg: response.data.message,
                            type: "Success",
                        });
                        this.new_attachements = this.new_attachements.filter(v =>v.id != id)
                    },
                    (error) => {
                        console.log(error);
                        if (error.response.status != 401) {
                            this.$store.commit('form/SET_NOTIFY', {
                                msg: this.$i18n.t("general.there is problem"),
                                type: "Danger",
                            });
                        }
                    }
                );
        },
        removeAttach(attach,item){
            this.$emit("remove", {attach,item});
        }
    },
}
</script>
<style scoped>
.attach-answer{
    max-width: 100%;
}
</style>
