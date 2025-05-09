import { database } from "@/api/api";
import { User } from "firebase/auth";
import { equalTo, get, orderByValue, query, ref } from "firebase/database";


interface AdminUser extends User{
    isAdmin : boolean
}

export async function adminUser(user : User) : Promise<AdminUser>{
    const email = user.email ?? "";

    try{
        const adminRef = ref(database, 'admin');
        const q = query(adminRef, orderByValue(), equalTo(email));
        const snapshot = await get(q);
        const isAdmin = snapshot.exists();
        return{...user, isAdmin};
    }catch(error){
        console.error(error);
    }
}