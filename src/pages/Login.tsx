import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonButtons,
    IonContent, 
    IonHeader, 
    IonIcon, 
    IonInput, 
    IonInputPasswordToggle, 
    IonItem, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    useIonRouter
} from '@ionic/react';
import { logoApple, logoIonic } from 'ionicons/icons';




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

      <IonAvatar style={{ width: "200px", height: "200px",
         display: "flex", alignItems: "center", justifyContent: "center" }}>
  <IonIcon icon={logoApple} style={{ fontSize: "150px" }} />
</IonAvatar>


      <IonItem>
        <IonInput label="Username" placeholder="@Lord-binns"></IonInput>
      </IonItem>
      
      <IonItem> 
      <IonInput type="password" label="Password" value="imSorry">
      <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
    </IonInput>
    </IonItem>


      <IonContent className='ion-padding'>

        
      <IonButton  id="present-alert" onClick={() => doLogin()} expand="full">
          Login    
          </IonButton>
      
          
      </IonContent>
    </IonPage>
  );
};

export default Login;