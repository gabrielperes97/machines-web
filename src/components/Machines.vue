<template>
<v-card flat>
    <v-card-text>
        <v-list two-line >
            <v-list-tile
                v-for="m in machines"
                :key="m.name"
            >
                <v-list-tile-content>
                    <v-list-tile-title v-text="m.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-text="getStatus(m.status)"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon ripple @click="editMachine(m)">
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
          id="addMachine"
          @click="addMachineDialog = true"
        >
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="editMachineDialog" max-width="400px">
            <v-card>
                <v-card-title>
                    Editar Maquina
                </v-card-title>
                <v-card-text>
                    <v-flex>
                        <v-text-field
                            label="Nome"
                            v-model="machineOnEdit.name"
                        ></v-text-field>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" flat @click="editMachineDialog=false">Fechar</v-btn>
                    <v-btn color="primary" flat @click="saveEditedMachine()">Salvar</v-btn>
                    <v-btn color="error" @click="deleteMachine()">Excluir</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="addMachineDialog" max-width="400px">
            <v-card>
                <v-card-title>
                    Adicionar Máquna
                </v-card-title>
                <v-card-text>
                    <v-flex>
                        <v-text-field
                            label="Nome"
                            v-model="addingMachine.name"
                        ></v-text-field>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" flat @click="addMachineDialog=false">Fechar</v-btn>
                    <v-btn color="primary" flat @click="newMachine()">Salvar</v-btn>
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
#addMachine
    bottom: -50px;

</style>

<script>
import configs from '../plugins/config';
import { clearInterval } from 'timers';

export default {
  name: 'machines',
  data() {
    return {
      showPassword: false,
      machines: [],
      editMachineDialog: false,
      machineOnEdit: { name: '' },
      snackbar: false,
      snackbarText: '',
      addMachineDialog: false,
      addingMachine: { name: '' },
    };
  },

  methods: {
    getMachines() {
      this.$http.get(`${configs.apihost}/machine/all`).then((response) => {
        this.machines = response.body;
      }).catch(err => console.log(err));
    },
    editMachine(m) {
      this.machineOnEdit = m;
      this.editMachineDialog = true;
    },
    deleteMachine() {
      this.editMachineDialog = false;
      this.$http.delete(`${configs.apihost}/machine/${this.machineOnEdit._id}`, this.machineOnEdit).then((response) => {
        this.getMachines();
        this.snackbarText = 'Máquina excluída';
        this.snackbar = true;
      }).catch(err => console.log(err));
    },
    saveEditedMachine() {
      this.editMachineDialog = false;
      this.$http.put(`${configs.apihost}/machine/${this.machineOnEdit._id}`, this.machineOnEdit).then((response) => {
        this.machineOnEdit = {};
        this.getMachines();
        this.snackbarText = 'Máquina salva';
        this.snackbar = true;
      }).catch(err => console.log(err));
    },
    newMachine() {
      this.addMachineDialog = false;
      this.$http.post(`${configs.apihost}/machine/`, this.addingMachine).then((response) => {
        this.addingMachine = {};
        this.getMachines();
        this.snackbarText = 'Máquina salva';
        this.snackbar = true;
      }).catch(err => console.log(err));
    },
    getStatus(s) {
      if (s) {
        return `${s.code} - ${s.name}`
      }
      return ""
    }

  },

  beforeMount() {
    this.getMachines();
    this.timer = setInterval(this.getMachines, 1000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

};
</script>
