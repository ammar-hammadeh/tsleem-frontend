<template>
    <div>
        <div v-if="questions.length > 0">
            <v-row v-for="(item, index) in questions" :key="index">
                <v-col cols="12" md="4">
                    <Input :item="item.question"></Input>
                </v-col>
                <v-col cols="12" md="4">
                    <Input :item="item.note"></Input>
                </v-col>
                <v-col cols="12" md="4">
                    <Input :item="item.attach" @change="uploadAttach(item,$event)"></Input>
                    <v-progress-linear
                        v-model="item.attach.uploadPercentage"
                        color="#c0946fbf"
                        height="15"
                        striped
                        :class="item.attach.isHidden ? 'd-none' : 'd-block'"
                    >
                        <strong>{{ Math.ceil(item.attach.uploadPercentage) }}%</strong>
                    </v-progress-linear>
                </v-col>
                <v-col cols="12" md="12" v-if="item.attach.attachements.length > 0">
                    <File :data="item" @remove="removeAttach"></File>
                </v-col>
        </v-row>
        </div>
    </div>
</template>
<script>
import Input from "../../../Components/Input.vue";
import File from "./File.vue";
export default {
    name: "FormQuestionsForm",
    props: ["questions"],
    components:{
        Input,File
    },
    data() {
        return {
        }
    },
    mounted() {
        console.log(this.questions)
   
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