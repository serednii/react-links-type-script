
import adminStore from "../mobx/adminStore";
import authStore from "../mobx/AuthStoreFile";

class AdminController {



openAdminPanel(openAdmin: boolean){
    const isAdmin = authStore.user.roles.includes("admin")
    isAdmin && adminStore.setOpenAdmin(openAdmin)
}

}

const adminController = new AdminController()
export default adminController;