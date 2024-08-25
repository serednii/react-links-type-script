
import adminStore from "../mobx/adminStore";
import authStore from "../mobx/AuthStore";
import logicStore from "../mobx/LogicStore";

class AdminController {



openAdminPanel(openAdmin: boolean){
    const isAdmin = authStore.user.roles.includes("admin")
     adminStore.setOpenAdmin(openAdmin)
}


accessUserActivated(){
    if(!authStore.user.isActivated){
    logicStore.info = "Ви повинні активуватися по Email"
    return false
  }else{
    return true
  }
}

accessUserAddedContent(){

    if(!authStore.user.isAddedContent){
        logicStore.info = "Ви не мщжете змінювати контент зверніться до адміністратора"
        return false
      }else {
        return true
      }
}





}

const adminController = new AdminController()
export default adminController;