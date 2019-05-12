<template>
<v-card flat>
    <v-card-text>
        <v-list two-line >
            <v-list-tile
                v-for="s in status"
                :key="s.code"
            >
                <v-list-tile-content>
                    <v-list-tile-title v-text="s.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-text="s.code"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon ripple @click="editStatus(s)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
        <v-btn
          dark
          small
          absolute
          bottom
          right
          fab
          id="addStatus"
          @click="addStatusDialog = true"
        >
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="editStatusDialog" max-width="400px">
            <v-card>
                <v-card-title>
                    Editar Status
                </v-card-title>
                <v-card-text>
                    <v-flex>
                        <v-text-field
                            label="Nome"
                            v-model="statusOnEdit.name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-text-field
                            label="Codigo"
                            v-model="statusOnEdit.code"
                        ></v-text-field>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" flat @click="editStatusDialog=false">Fechar</v-btn>
                    <v-btn color="primary" flat @click="saveEditedStatus()">Salvar</v-btn>
                    <v-btn color="error" @click="deleteStatus()">Excluir</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="addStatusDialog" max-width="400px">
            <v-card>
                <v-card-title>
                    Adicionar Status
                </v-card-title>
                <v-card-text>
                    <v-flex>
                        <v-text-field
                            label="Nome"
                            v-model="addingStatus.name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-text-field
                            label="Codigo"
                            v-model="addingStatus.code"
                        ></v-text-field>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" flat @click="addStatusDialog=false">Fechar</v-btn>
                    <v-btn color="primary" flat @click="newStatus()">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card-text>
    <v-snackbar
      v-model="snackbar"
      bottom
    >
        {{snackbarText}}
        <v-btn
            flat
            @click="snackbar=false"
        >
        Fechar
        </v-btn>
    </v-snackbar>
</v-card>
</template>

<style lang="sass" scoped>
#addStatus
    bottom: -35px;

</style>

<script>
import configs from '../plugins/config';

export default {
  name: 'status-crud',
  data() {
    return {
      showPassword: false,
      status: [],
      editStatusDialog: false,
      statusOnEdit: {},
      snackbar: false,
      snackbarText: '',
      addStatusDialog: false,
      addingStatus: { name: '', code: '' },
    };
  },

  methods: {
    getStatus() {
      this.$http.get(`${configs.apihost}/status/all`).then((response) => {
        this.status = response.body;
      }).catch(err => console.log(err));
    },
    editStatus(s) {
      this.statusOnEdit = s;
      this.editStatusDialog = true;
    },
    deleteStatus() {
      this.editStatusDialog = false;
      this.$http.delete(`${configs.apihost}/status/${this.statusOnEdit._id}`, this.statusOnEdit).then((response) => {
        this.getStatus();
        this.snackbarText = 'Status excluído';
        this.snackbar = true;
      }).catch(err => console.log(err));
    },
    saveEditedStatus() {
      this.editStatusDialog = false;
      this.$http.put(`${configs.apihost}/status/${this.statusOnEdit._id}`, this.statusOnEdit).then((response) => {
        this.statusOnEdit = {};
        this.getStatus();
        this.snackbarText = 'Status salvo';
        this.snackbar = true;
      }).catch(err => console.log(err));
    },
    newStatus() {
      this.addStatusDialog = false;
      this.$http.post(`${configs.apihost}/status/`, this.addingStatus).then((response) => {
        this.addingStatus = {};
        this.getStatus();
        this.snackbarText = 'Status salvo';
        this.snackbar = true;
      }).catch(err => console.log(err));
    },

  },

  beforeMount() {
    this.getStatus();
    this.timer = setInterval(this.getStatus, 1000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

};
</script>
