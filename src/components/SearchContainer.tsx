import React, { useState } from 'react';
import { IonSearchbar, IonList, IonItem, IonLabel, IonContent, IonText, IonIcon, IonButton } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';

interface SearchContainerProps {
  placeholder?: string;
}

const CleanEarthSearch: React.FC<SearchContainerProps> = ({ placeholder = 'Search sustainable practices...' }) => {
  const [searchText, setSearchText] = useState('');

  const items = [
    'Recycling',
    'Composting',
    'Energy Conservation',
    'Tree Planting',
    'Sustainable Transport',
    'Clean Energy',
    'Waste Reduction',
    'Plastic-Free Alternatives',
    'Eco-Friendly Packaging',
    'Water Conservation',
    'Sustainable Agriculture',
    'Eco-Tourism',
    'Upcycling',
    'Green Building',
    'Sustainable Fashion'
  ];

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  const clearSearch = () => setSearchText('');

  return (
    <IonContent className="ion-padding">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          placeholder={placeholder}
          debounce={300}
        />
        {searchText && (
          <IonButton fill="clear" onClick={clearSearch}>
            <IonIcon icon={closeCircle} />
          </IonButton>
        )}
      </div>

      <IonList>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>{item}</IonLabel>
            </IonItem>
          ))
        ) : (
          <IonText color="medium">No items found. Try a different search.</IonText>
        )}
      </IonList>
    </IonContent>
  );
};

export default CleanEarthSearch;
