import React, { useState } from 'react'
import WheelModal from './WheelModal';

// Ceci est une interface pour les propriétés de la composante Circle. Il spécifie que les propriétés doivent inclure un rayon (radius) qui est un nombre et des valeurs (values) qui est un tableau de chaînes de caractères.
interface CircleProps {
    radius: number;
    values: string[];
    setValueArray: React.Dispatch<React.SetStateAction<string[]>>;
}

// Ici, nous créons une composante Circle qui est une fonction fléchée de type React.FC (Functional Component) avec les propriétés spécifiées dans CircleProps. Cette composante prend deux propriétés : le rayon et les valeurs.
const WheelComponent: React.FC<CircleProps> = ({ radius, values, setValueArray }) => {
    // Nous définissons la taille de chaque segment en calculant la différence angulaire entre chaque élément du tableau des valeurs. Ensuite, nous définissons une liste de couleurs pour les segments.
    const step = 360 / values.length;
    const segmentColors = ['#b20a2c', '#17202a', '#cf9ca6'];
    const [selectedValue, setSelectedValue] = useState('');
    const [isSpinning, setIsSpinning] = useState<boolean>(false)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const handleSpin = () => {
        if (isSpinning || values.length < 2) {
            return
        }
        setIsSpinning(true)

        if (values.length >= 2) {

        }
        // Récupère tous les segments de la roue
        const segments = document.querySelectorAll('.wheelSide__wheel path');
        // Choisis une valeur aléatoire dans le tableau "values"
        const randomIndex = Math.floor(Math.random() * values.length);
        // Récupère la valeur cible correspondant à l'index aléatoire
        const targetValue = values[randomIndex];
        // Récupère l'index de la valeur cible dans le tableau "values"
        const targetIndex = values.indexOf(targetValue);

        // Met à jour la valeur sélectionnée
        setSelectedValue(targetValue);
        // Le nombre de tours complets que la roue doit effectuer
        let cycles = 7;
        // La durée totale en millisecondes que la roue doit tourner
        let duration = 3000;

        // Initialise les variables "count" et "intervalId"
        let count = 0;
        let intervalId = setInterval(() => {
            // Met à jour la couleur des segments à chaque itération
            segments.forEach((segment, index) => {
                // Si l'index correspond au reste de la division de "count" par la longueur des segments, la couleur est mise à jour en rouge
                const color = index === count % segments.length ? '#ff6166' : segmentColors[index % segmentColors.length];
                segment.setAttribute('fill', color);
            });
            // Incrémente "count"
            count++;
            // Si le nombre de tours atteint le nombre cible, stoppe l'intervalle et met à jour les couleurs pour indiquer le segment gagnant
            const stopCount = segments.length * cycles + targetIndex;
            if (count >= stopCount) {
                clearInterval(intervalId);
                segments.forEach((segment, index) => {
                    const color = index === targetIndex ? '#ff6166' : segmentColors[index % segmentColors.length];
                    segment.setAttribute('fill', color);
                });
                setTimeout(() => {
                    setIsSpinning(false);
                    // appel du modal pour afficher le gagnant an grand
                    setModalIsOpen(true);
                }, 500);

            }
        }, duration / (segments.length * cycles));
    };

    const deleteValue = (value: string) => {
        const newArray = values.filter((val) => val !== value)
        setValueArray(newArray)
    }

    return (
        <section className='wheelSide'>
            {modalIsOpen && <WheelModal value={selectedValue} modalIsClose={setModalIsOpen} onDelete={deleteValue} />}
            <div className='wheelSide__container'>
                {/* Bouton pour faire tourner la roue */}
                <div className='wheelSide__spinBtn' onClick={handleSpin}>spin</div>
                {/* La roue SVG */}
                <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className='wheelSide__wheel'>
                    {values.map((value, index) => {
                        // Calcule les angles de départ et de fin pour chaque segment
                        const startAngle = (index * step - step / 2) * (Math.PI / 180);
                        const endAngle = ((index + 1) * step - step / 2) * (Math.PI / 180);
                        // Calcule un indicateur de "grand arc" pour les segments qui couvrent plus de la moitié du cercle
                        const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
                        // Définit le chemin SVG pour chaque segment en utilisant les angles de départ et de fin
                        const segmentPath = `
                        M ${radius},${radius}
                        L ${radius + radius * Math.cos(startAngle)}, ${radius + radius * Math.sin(startAngle)}
                        A ${radius},${radius} 0 ${largeArcFlag},1 ${radius + radius * Math.cos(endAngle)}, ${radius + radius * Math.sin(endAngle)}
                        L ${radius},${radius}
                        Z`;
                        // Définit la couleur de chaque segment en alternant entre deux couleurs
                        const segmentColor = segmentColors[index % segmentColors.length];
                        // Calcule la position de chaque valeur à l'intérieur de son segment
                        const textRadius = radius * 0.65;
                        const textAngle = startAngle + (endAngle - startAngle) / 2;
                        const x = radius + textRadius * Math.cos(textAngle);
                        const y = radius + textRadius * Math.sin(textAngle) + 2;
                        const textAnchor = 'start';
                        // Formate la valeur en texte pour l'afficher à l'intérieur du segment.Si la valeur a plus de 15 caractères, elle est tronquée et suivi de points de suspension. Sinon, elle est laissée telle quelle.
                        const formattedValue = value.length > 15 ? `${value.slice(0, 15)}...` : value;
                        // Vérifie si la valeur est actuellement sélectionnée
                        const isSelected = selectedValue === value;
                        // Applique une rotation au texte pour qu'il soit orienté vers l'intérieur du segment
                        const rotation = `rotate(${textAngle * 180 / Math.PI}, ${x}, ${y - 3})`;
                        // Rend chaque segment et sa valeur à l'intérieur en utilisant des éléments SVG de chemin et de texte
                        return (
                            <React.Fragment key={index}>
                                <path d={segmentPath} fill={isSelected ? '#ff6166' : segmentColor} />
                                <text
                                    className='wheelSide__values'
                                    x={x}
                                    y={y}
                                    dx={-formattedValue.length * 3}
                                    transform={`${rotation}`}
                                    fontSize={'0.85em'}
                                    fontWeight={'600'}
                                    textAnchor={textAnchor}
                                    fill={'white'}>
                                    {formattedValue}
                                </text>
                            </React.Fragment>
                        );
                    })}
                </svg>
            </div>
        </section>


    );
};

export default WheelComponent;


