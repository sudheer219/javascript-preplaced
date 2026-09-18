class BasePhone {
    makeCall(number){
        console.log(`📞 Calling ${number}`)
    }
}

class ProPhone extends BasePhone{
    useHDCamera(){
        console.log(`📷 Taking HD photo with HD Camera`)
    }
}

const iPhone = new ProPhone();
iPhone.makeCall(8801113741);
iPhone.useHDCamera();