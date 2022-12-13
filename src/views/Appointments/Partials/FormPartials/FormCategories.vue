<template>
    <div>
        <div v-for="(item, index) in categories" :key="index" class="my-10 special-category-card">
            <h4
                class="
                    theme--light
                    my-3
                    text-h4
                    font-weight-bold
                "
                >
                    {{ item.get_category.name }}
            </h4>
            <div
            v-if="categories_form.length > 0" :key="index">
            
                <v-row v-for="(question, i) in categories_form[index]" :key="i">
                    <v-col cols="12" md="4">
                        <Input :item="question.question"></Input>
                    </v-col>
                    <v-col cols="12" md="4">
                        <Input :item="question.note"></Input>
                    </v-col>
                    <v-col cols="12" md="4">
                    <Input :item="question.attach" @change="uploadAttach(question,$event)"></Input>
                    <v-progress-linear
                        v-model="question.attach.uploadPercentage"
                        color="#c0946fbf"
                        height="15"
                        striped
                        :class="question.attach.isHidden ? 'd-none' : 'd-block'"
                    >
                        <strong>{{ Math.ceil(question.attach.uploadPercentage) }}%</strong>
                    </v-progress-linear>
                </v-col>
                <v-col cols="12" md="12" v-if="question.attach.attachements.length > 0">
                    <File :data="question" @remove="removeAttach"></File>
                </v-col>
            </v-row>
            </div>
        </div>
    </div>
</template>
<script>
import Input from "../../../Components/Input.vue";
import File from "./File.vue";

export default {
    name: "FormCategories",
    props: ["categories","categories_form"],
    components:{
        Input,File
    },
    methods: {
        removeAttach(data){
            return axios.delete('general/forms/delete-answer-attach/'+data.attach.id).then(
                    (response) => {
                        console.log(response);
                        this.$store.commit('form/SET_NOTIFY', {
                            msg: response.data.message,
                            type: "Success",
                        });
                        data.item.attachements = data.item.attachements.filter(v =>v.id != data.attach.id)
                    },
                    (error) => {
                        // console.log(error);
                        this.handelError(error)
                    }
                );
        },
        uploadAttach(item,$event){
            console.log($event)
            if($event != null && $event.length > 0){
                item.attach.isHidden = false
                let formData = new FormData();
                formData.append(`question_id`, item.question_id);
                formData.append(`id`, item.id);
                formData.append(`assign_camps_id`, this.$route.params.id);
                formData.append(`form_id`, this.$route.params.form);
                for (var i = 0; i < $event.length; i++) {
                    const val = $event[i];
                    formData.append(`answer_attach[${i}]`,val)
                }
                return axios.post('general/forms/upload-answer-attach', formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: function( progressEvent ) {
                        item.attach.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
                    }.bind(this)
                    }).then(
                    (response) => {
                        console.log(response);
                        this.$store.commit('form/SET_NOTIFY', {
                            msg: response.data.message,
                            type: "Success",
                        });
                        item.attach.attachements = item.attach.attachements.concat(response.data.files)
                        item.id = response.data.id
                        setTimeout(function(){
                            item.attach.isHidden = true
                            item.attach.value = null
                            item.attach.uploadPercentage = 0
                        },1000)
                    },
                    (error) => {
                        console.log(error);
                        this.handelError(error)
                    }
                );
            }
            // return item
        },
        handelError(error){
        if (error.response.status != 401) {
            this.$store.commit('form/SET_NOTIFY', {
                msg: this.$i18n.t("general.there is problem"),
                type: "Danger",
            });
        }
        }
    },
};
</script>
<style scoped>
.special-category-card{
  border: 1px solid;
  border-radius: 5px;
  padding: 20px;
  padding-top: 0;
  position: relative;
}
.special-category-card h4{
  position: relative;
  top: -30px;
  background: white;
  min-width: max-content;
  padding-left: 7px;
  padding-right: 7px;
  display: inline-block;
}
</style>