## Context

Parfois on veut afficher des Dashboard avec pleins de données et notamment des graphiques. Mauvaise nouvelle : les graphiques prennent beaucoup de temps à charger si il y a besoin de grande quantité de données.

Parfois ces graphiques vont ralentir l'intégralité de notre application ce qui n'est vraiment pas souhaitable.

On peut résoudre ce problème avec le concept de "Streaming" qui permet d'afficher la page **alors même que certain composant sont en train de charger**.

## Exercice

Déplace le code problématique dans un composant séparer et dans la page, utilise `<Suspense>` pour optimiser le chargement de la page.
