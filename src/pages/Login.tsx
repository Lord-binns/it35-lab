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
  IonToast, 
  useIonRouter
} from '@ionic/react';
import { useState } from "react";
import { logoApple } from 'ionicons/icons';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigation = useIonRouter();

  const doLogin = () => {
    setShowToast(true);
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 1000);
  };

  const doRegister = () => {
    navigation.push('/it35-lab/Signup', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonAvatar style={{ width: "200px", height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IonIcon icon={logoApple} style={{ fontSize: "150px" }} />
      </IonAvatar>

      <IonContent className='ion-padding' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <IonItem>
          <IonInput
            label="Email"
            type="email"
            placeholder="example@domain.com"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            required
          />
        </IonItem>

        <IonItem>
          <IonInput
            type="password"
            label="Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            required
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>
        </IonItem>

        <IonButton id="present-toast" onClick={doLogin} expand="full">
          Login
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          trigger="present-toast"
          duration={1000}
          message="Login Successfully, Redirecting..."
          position="top"
        />

        <IonButton onClick={doRegister} expand="full" color="secondary">
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
