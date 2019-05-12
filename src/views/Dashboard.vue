<template lang="html">
  <v-app class="Dashboard">
    <v-container grid-list-lg fluid>
      <v-layout row wrap>
        <v-flex offset-xl2 xl8 offset-lg2 lg8 offset-md2 md8 offset-sm1 sm10 xs12 class="note">
          <v-card>
            <v-card-text>
              <p class="text-xs-center title font-weight-bold">Machines</p>
              <v-tabs
                  centered
                  slider-color="primary"
                  >
                <v-tab>
                  Maquinas
                </v-tab>
                <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <Machines />
                  </v-card-text>
                </v-card>
                </v-tab-item>
                <v-tab>
                  Gerenciar Status
                </v-tab>
                <v-tab-item>
                  <StatusCrud />
                </v-tab-item>
              </v-tabs>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style lang="sass" scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import StatusCrud from '../components/StatusCrud.vue';
import Machines from '../components/Machines.vue';

export default Vue.extend({
  components: {
    StatusCrud,
    Machines,
  },
});
</script>
