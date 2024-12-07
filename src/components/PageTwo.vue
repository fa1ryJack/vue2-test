<script>
import fileDownload from "js-file-download";
export default {
  data() {
    return {
      uploadURL: "https://api.escuelajs.co/api/v1/files/upload",
      readyToUpload: false,
      file: null,
      uploaded: false,
      downloadURL: "",
      snackbar: false,
      loading: false,
      snackbarSuccess: false,
    };
  },
  methods: {
    handleChangedFile: function (file) {
      this.file = file;
      this.file !== null
        ? (this.readyToUpload = true)
        : (this.readyToUpload = false);
    },
    handleUpload: function () {
      this.loading = true;
      try {
        this.axios
          .post(
            this.uploadURL,
            { file: this.file },
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((response) => {
            this.downloadURL = response.data.location;
          })
          .finally(() => {
            this.uploaded = true;
            this.loading = false;
            this.snackbarSuccess = true;
          });
      } catch (error) {
        this.loading = false;
        this.snackbar = true;
      }
    },
    handleDownload: function () {
      this.axios
        .get(this.downloadURL, { responseType: "blob" })
        .then((response) => {
          let gettingFileName = this.downloadURL.split("/");
          fileDownload(
            response.data,
            gettingFileName[gettingFileName.length - 1]
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<template>
  <div class="d-flex align-center flex-column mt-10" width="100%">
    <v-file-input label="File input" @change="handleChangedFile"></v-file-input>
    <v-btn
      v-if="readyToUpload"
      width="fit-content"
      color="green"
      class="white--text"
      @click="handleUpload"
    >
      Upload
    </v-btn>
    <v-btn
      v-if="uploaded"
      width="fit-content"
      color="green mt-10"
      class="white--text"
      @click="handleDownload"
    >
      Download
    </v-btn>

    <v-progress-circular
      v-if="loading"
      color="green"
      class="mt-10"
      indeterminate
    ></v-progress-circular>

    <v-snackbar v-model="snackbarSuccess" color="green" :timeout="2000">
      File is uploaded!
    </v-snackbar>

    <v-snackbar v-model="snackbar" color="red" :timeout="3000">
      Error has occured during uploading. Please, try again.
    </v-snackbar>
  </div>
</template>

<style>
.v-file-input {
  width: 50%;
}
</style>
