// import React, { useState } from 'react'

// // Ceci est une interface pour les propriétés de la composante Circle. Il spécifie que les propriétés doivent inclure un rayon (radius) qui est un nombre et des valeurs (values) qui est un tableau de chaînes de caractères.
// interface CircleProps {
//     radius: number;
//     values: string[];
// }

// // Ici, nous créons une composante Circle qui est une fonction fléchée de type React.FC (Functional Component) avec les propriétés spécifiées dans CircleProps. Cette composante prend deux propriétés : le rayon et les valeurs.
// const WheelComponent: React.FC<CircleProps> = ({ radius, values }) => {

//     // Nous définissons la taille de chaque segment en calculant la différence angulaire entre chaque élément du tableau des valeurs. Ensuite, nous définissons une liste de couleurs pour les segments.
//     const step = 360 / values.length;
//     const segmentColors = ['#b20a2c', '#17202a', '#cf9ca6'];
//     const [classSate, setClassState] = useState('wheelSide__wheel')

//     const handleOnClick = () => {
//         setClassState('wheelSide__wheelSpin')
//         setTimeout(() => {
//             setClassState('wheelSide__wheel')
//         }, Math.floor(Math.random() * 1000), 6000)


//     }

//     return (
//         <section className='wheelSide'>
//             <div className='wheelSide__container'>
//                 <div onClick={handleOnClick} className='wheelSide__spinBtn'>spin</div>
//                 <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className={classSate}>

//                     {/* Cette ligne utilise la méthode map pour parcourir chaque élément du tableau values et exécuter une fonction pour chacun. Cette fonction prend deux arguments : la value actuelle (l'élément du tableau) et son index dans le tableau. */}
//                     {values.map((value, index) => {

//                         // Cette ligne calcule l'angle de départ du segment actuel en utilisant l'index de l'élément et un step défini ailleurs dans le code. L'angle est calculé en radians (Math.PI / 180 est utilisé pour convertir des degrés en radians).
//                         const startAngle = (index * step - step / 2) * (Math.PI / 180);

//                         //  Cette ligne calcule l'angle de fin du segment actuel en utilisant l'index de l'élément et un step. Comme pour startAngle, l'angle est calculé en radians.
//                         const endAngle = ((index + 1) * step - step / 2) * (Math.PI / 180);

//                         // Cette ligne calcule une valeur binaire qui sera utilisée plus tard pour déterminer la façon dont le segment sera affiché. Si l'angle entre le début et la fin du segment est inférieur ou égal à pi radians (180 degrés), largeArcFlag est 0. Sinon, il est 1.
//                         const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

//                         // const segmentPath crée une chaîne de caractères qui définit le chemin SVG pour le segment actuel. La chaîne contient des commandes SVG telles que "M" pour "move to" (déplacer le stylo sans dessiner), "L" pour "line to" (dessiner une ligne droite), et "A" pour "arc to" (dessiner une partie d'un cercle). Les coordonnées x et y de chaque point sont calculées en utilisant les formules pour trouver les coordonnées sur un cercle.

//                         // M 200,200: Cette commande SVG déplace le stylo sans dessiner à la position (200,200), qui est le centre du cercle.

//                         // L ${200 + radius * Math.cos(startAngle)}, ${200 + radius * Math.sin(startAngle)}: Cette commande SVG dessine une ligne droite à partir de la position actuelle jusqu'à un point sur le cercle qui correspond à l'angle de départ calculé précédemment.

//                         // A ${radius},${radius} 0 ${largeArcFlag},1 ${200 + radius * Math.cos(endAngle)}, ${200 + radius * Math.sin(endAngle)}: Cette commande SVG dessine une partie d'un cercle en utilisant l'angle de départ, l'angle de fin et le rayon du cercle. Le paramètre largeArcFlag détermine si l'arc dessiné sera plus grand ou plus petit que 180 degrés. Le segment se termine à un autre point sur le cercle qui correspond à l'angle de fin calculé précédemment.

//                         // L 200,200: Cette commande SVG dessine une ligne droite à partir de la position
//                         const segmentPath = `
//                     M 200,200
//                     L ${200 + radius * Math.cos(startAngle)}, ${200 + radius * Math.sin(startAngle)}
//                      A ${radius},${radius} 0 ${largeArcFlag},1 ${200 + radius * Math.cos(endAngle)}, ${200 + radius * Math.sin(endAngle)}
//                      L 200,200
//                      Z`;


//                         //  Cette ligne définit la couleur du segment en utilisant un tableau de couleurs segmentColors et l'index du segment actuel. Le modulo (%) est utilisé pour assurer que l'index reste dans les limites du tableau.
//                         const segmentColor = segmentColors[index % segmentColors.length];


//                         //  Cette ligne définit la distance entre le centre du cercle et le texte qui sera affiché sur chaque segment.
//                         const textRadius = radius * 0.7;

//                         // Cette ligne calcule l'angle auquel le texte doit être affiché sur le segment en prenant le milieu de l'angle de départ et de l'angle de fin du segment.
//                         const textAngle = startAngle + (endAngle - startAngle) / 2;

//                         // Cette ligne calcule la position x à laquelle le texte doit être affiché en utilisant l'angle calculé précédemment et la distance depuis le centre.
//                         const x = 200 + textRadius * Math.cos(textAngle);

//                         // Cette ligne calcule la position y à laquelle le texte doit être affiché en utilisant l'angle calculé précédemment et la distance depuis le centre.
//                         const y = 200 + textRadius * Math.sin(textAngle);

//                         //  Cette ligne définit l'ancre du texte. Dans ce cas, l'ancre est définie sur "start", ce qui signifie que le texte sera aligné sur la position x calculée précédemment.
//                         const textAnchor = 'start';


//                         // Cette ligne formate la valeur à afficher sur le segment. Si la valeur a plus de 15 caractères, elle est tronquée et suivi de points de suspension. Sinon, elle est laissée telle quelle.
//                         const formattedValue = value.length > 15 ? `${value.slice(0, 15)}...` : value;

//                         return (
//                             <React.Fragment key={index}>
//                                 <path d={segmentPath} fill={segmentColor} stroke="white" strokeWidth="3" />
//                                 <text
//                                     className='wheelSide__values'
//                                     x={x}
//                                     y={y}
//                                     dx={-formattedValue.length * 3} // adjust position based on word length
//                                     transform={`rotate(${textAngle * 180 / Math.PI}, ${x}, ${y})`}
//                                     fontSize={'0.9em'}
//                                     textAnchor={textAnchor}
//                                     fill='white'>
//                                     {formattedValue}
//                                 </text>
//                             </React.Fragment>
//                         );
//                     })}
//                 </svg>
//             </div>
//         </section>
//     );
// };
// export default WheelComponent;