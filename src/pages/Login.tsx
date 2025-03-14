import { 
  IonButton,
  IonButtons,
    IonContent, 
    IonHeader, 
    IonInput, 
    IonInputPasswordToggle, 
    IonItem, 
    IonMenuButton, 
    IonPage, 
    IonRippleEffect, 
    IonTitle, 
    IonToolbar, 
    useIonRouter
} from '@ionic/react';




const Login: React.FC = () => {
  const navigation = useIonRouter();
  const doLogin = () => {
      navigation.push('/it35-lab/app','forward','replace');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="ion-activatable ripple-parent rectangle">
        <IonRippleEffect></IonRippleEffect>
      </div>
      
      <IonItem>
        <IonInput label="Username" placeholder="@Lord-binns"></IonInput>
      </IonItem>
      
      <IonItem> 
      <IonInput type="password" label="Password" value="imSorry">
      <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
    </IonInput>
    </IonItem>


      <IonContent className='ion-padding'>

        
      <IonButton onClick={() => doLogin()} expand="full">
          Login    
          </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;