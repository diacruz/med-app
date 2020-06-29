class Profile{
    constructor(id, name, email, number, title, avatar, status, certs, isVisible){
        this.id = id;
       // this.subId = subId;
        this.name = name;
        this.email = email;
        this.number = number;
        this.title = title;
        this.avatar = avatar;
        this.status = status;
        this.certs = certs;
        this.isVisible = isVisible;
    }
}

export default Profile;