## Rome - Linter & Formatter

Para este proyecto estoy usando Rome: es un linter y formatter nuevo, más rápido que eslint y prettier, aunque todavía 
no es tan potente pero está en pleno crecimiento.

Para utilizarlo he dado los siguientes pasos:

1. Instalar rome en el proyecto -> `npm add rome -D`
2. Desactivar(Disabled in Workspace) Prettier y Eslint en este workspace.
3. Crear archivo de configuración _rome.json_ a mano porque no me ha funcionado el comando `npm rome init`.
   _updated: Acabo de darme cuenta que es `npx rome init`, pero bueno, ya lo he hecho a mano._ 
4. Crear el archivo *.vscode/settings.json* (para que la configuración que le indicamos sólo afecte a este proyecto).
  Así evitamos conflictos con eslint que tengamos por defecto en VSCode.

## Tremor - Libreria React de componentes para dashboards

También usamos en este proyecto esta librería de componentes para react enfocada a dashboards y gráficas.
Necesita Tailwind CSS para funcionar.

Pasos para usar Tremor:
1. Instalar Tremo -> `npm install @tremor/react -E`
2. Instalar Tailwindcss -> `npm install -D tailwindcss postcss autoprefixer`
3. Ejecutar `npx tailwindcss init -p`
4. Completar el archivo tailwind.config.js como está en este proyecto.
5. Elininar todo el contenido y agregar las tres @tailwind... al index.css(eliminar el contenido es opcional)

## HeroIcons - Iconos SVG

En este proyecto también usamos algunos iconos de de heroIcons.

## Redux

Pasos para utilizar redux-toolkit:
1. Instalar redux -> `npm install @reduxjs/toolkit react-redux -E`
2. Instalar necesario para react -> `npm install react-redux`

### Crear estado con redux

1. Creamos el archivo _store/index.ts_
2. Dentro de este llamamaos a _ConfigureStore_ y creamos el _reducer: {}_
3. En _main.tsx_ importamos _store.ts_ y creamos el _Provider_, envolvemos toda la apliación con este _Provider_ 
  para desde cualquier parte podamos leer la _store_ y mandar acciones a esta para que genere nuevos estados.

La __store__ esta formada por _'slices'_, podemos ver esto como una pizza que sería la store y los slices son porciones de esta.

### Crear el primer reducer

Para crear el primer reducer editamos el archivo _store/users/slice.ts_ dentro de _usersSlice_ .
Este reducer lo vamos a usar en uno de los botones, para ello, lo importamos en el archivo correspondiente y 
cons los hooks __useSelector__ y __useDispatch__ (que hemos personalizado con otro nombre y tipado) usamos el reducer.

Es muy conveniente tener todas las funciones que van a ser las actions de nuestra app en custom hook para que 
los componentes estén limpios, y si el día de mañana tenemos que quitar redux es mucho más fácil.

### Middleware

Un middleware es algo que se ejecuta en mitad de algo. Los middleware tienen 2 fases, 1: 'se ponen' entre el
 _Event Handler(dispatch)_ y la _Store_ y 2: entre el _State_ y la _UI_, divididas por el `next(action)`.
Nos permite capturar cuando se hace un dispatch, ver lo que está haciendo, poder esperar a que
termnine el reducer correspondiente y actualice el state, y una vez que tenemos el nuevo estado, hacer algo con eso. Esto
nos permite cambiar la funcionalidad que está haciendo nuestra aplicación de forma totalmente transparente. Por ejemplo
para evitar llamar a localStorage constanteme en cada reducer.

## Sonner

Librería para notificaciones