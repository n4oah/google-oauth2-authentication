<template>
  <div>
    <v-navigation-drawer class="indigo lighten-1" v-model="drawer" app>
      <div class="text-xs-center">
        <v-btn depressed large flat class="white--text font-weight-bold">Menu List</v-btn>
      </div>
      <v-list>
        <v-list-tile v-for="item in menus" :key="item.title">
          <v-list-tile-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content class="white--text">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo white--text" fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <v-icon color="white">more_vert</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>원 타치 블로그</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="showDialogLogin">로그인</v-btn>
      <v-btn @click="onLogout">로그아웃</v-btn>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-dialog v-model="isLoginDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">로그인</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <a @click="onLoginAuth(LoginType.Google)">
                  <v-img height="77" :src="require('@/assets/image/login/google-login-button.png')" />
                </a>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="isLoginDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="isLoginDialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { LoginType } from '@/assets/ts/account/loginInfo'

@Component
class HeaderComponent extends Vue {
  drawer: boolean = false
  isLoginDialog: boolean = false
  menus: Object[] = [
    { title: 'Dashboard', icon: 'dashboard' },
    { title: 'Account', icon: 'account_box' },
    { title: 'Admin', icon: 'gavel' }
  ]
  LoginType = LoginType

  showDialogLogin(): void {
    this.isLoginDialog = !this.isLoginDialog
  }

  onLoginAuth(authType: string): void {
    //this.$cookies.set('LOGIN_SUCCESS_URL', '123')
    //window.location.href='http://localhost/login/google'
    //console.log(process.axios.baseURL)
    console.log(process.env.apiURL)
    console.log(authType)
    console.log(process.env.NODE_ENV)
  }

  onLogout(): void {

  }
}

export default HeaderComponent
</script>
