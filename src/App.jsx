import {useState, useRef} from 'react'
import './App.css'
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function App() {
	const [count, setCount] = useState(0)
	const API_KEY = '5f88a0bd-eb49-408d-9281-43d49029e56d';

	const mapState = {center: [68.9632, 33.0902], zoom: 10};

	const [ymaps, setYmaps] = useState(null);
	// Завел для хранения маршрута переменную(аналогия переменной класса в стэйтлесс компоненте)
	const routes = useRef(null);

	const [alignment, setAlignment] = useState('bankomat');

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};


	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	const [subMenu, setSubMenu] = useState(false);

	// В данном случае строим маршрут сразу, но можно изменить и строить по клику на кнопку
	const getRoute = ref => {
		if (ymaps) {

			const multiRoute_3936 = new ymaps.multiRouter.MultiRoute({
				referencePoints: ["г Мурманск, Кольский пр-кт, д 134", "г Мурманск, Кольский пр-кт, д 22"],
				params: {results: 1}
			}, {
				pinIconFillColor: "00b527",
				routeStrokeColor: "00b527",
				routeActiveStrokeColor: "00b527",
				boundsAutoApply: false
			});


			// Кладем полученный маршрут в переменную
			routes.current = multiRoute_3936;
			// ref.geoObjects.add(multiRoute_3936);
		}
	};

	const getRoutes = () => {
		// Теперь в этой переменной можем получить инстанс маршрута
		console.log(routes.current.getWayPoints());
	};

	return (
		<>

			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{"Вы взяли электронный талон"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">

							<span className="text-[56px]">А-569</span>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Отказаться</Button>
						<Button onClick={handleClose} autoFocus>
							Взять талон
						</Button>
					</DialogActions>
				</Dialog>
			</div>

			<div className="flex">
				<div className="flex-none w-[350px] p-1 py-5">
					{/*		<div className="w-72">
						<div className="relative h-10 w-full min-w-[100px]">
							<input
								className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
								placeholder=" "
							/>
							<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"> Где вы находитесь </label>
						</div>
					</div>*/}

					<div className="flex  flex-col p-2 gap-3">
						<TextField id="outlined-basic" label="Где вы находитесь?" variant="outlined"  defaultValue="Ленина 14"/>

						<ToggleButtonGroup
							color="primary"
							value={alignment}
							exclusive
							onChange={handleChange}
							aria-label="Platform"
						> <ToggleButton value="bankomat">Банкомат</ToggleButton> <ToggleButton value="office">Офис</ToggleButton>

						</ToggleButtonGroup>
						<div className={"" + (alignment === 'bankomat' ? " hidden": '')}>
							<FormControl> <FormLabel id="demo-row-radio-buttons-group-label">Вид операции</FormLabel> <RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="row-radio-buttons-group"
							> <FormControlLabel value="female" control={<Radio/>} label="Консультация"/> <FormControlLabel value="male" control={<Radio/>} label="Ипотека"/>
								<FormControlLabel value="urlc" control={<Radio/>} label="Юр. лица"/> <FormControlLabel value="other" control={<Radio/>} label="Прочие вопросы"/>
							</RadioGroup> </FormControl>
						</div>
						<div onClick={e => (setSubMenu(pre => !pre))} className={"cursor-pointer "+ (!subMenu ? ' ' : ' hidden')}>
							<div className="border p-3">
								<Typography component="legend">Ленина 18</Typography> <Rating name="read-only" value={3} readOnly/>
								<div>
									Человек в очереди: 5
								</div>
								<div>
									Ваше время прибытия в офисе: 18:21
								</div>
								<div className="pt-3">
									Вас обслужат за 5 мин
								</div>
							</div>
						</div>

						<div className={"flex-none w-[350px] p-1 py-5" + (subMenu ? ' ' : ' hidden')}>

							<div><strong>Ленина 18</strong></div>
							<div>Вы будете здесь в 18:20</div>
							<div className="pb-5">Вас обслужат за 5 мин</div>
							<Button variant="contained" onClick={handleClickOpen}>Взять электронный талон</Button>

						</div>
					</div>
				</div>



				<div className="flex-1 w-full">
					<YMaps query={{
						load: "package.full",
						apikey: API_KEY
					}}>
						<Map
						width="100%"
						height="100vh"
						defaultState={{center: [55.684758, 37.738521], zoom: 11,
								controls: ["zoomControl", "fullscreenControl"]}}

						modules={["multiRouter.MultiRoute"]}

						onLoad={ymaps => setYmaps(ymaps)}                                // state={mapState}
						instanceRef={ref => ref && getRoute(ref)}
					>
							<Placemark geometry={[55.684758, 37.738521]} />
						{/*<RouteButton options={{float: "right"}}/> */}
						</Map>

					</YMaps>

				</div>
			</div>


		</>
	)
}

export default App
