import React from 'react'
import { PanelHeader, FormLayout, Textarea, Input, FixedLayout, Button, Div, platform, ANDROID, FormStatus } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Icon24Done from '@vkontakte/icons/dist/24/done'

class AddTask extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name : '',
			text : '',
			error : false
		};
	}

	onClickAddTask = () => {
		let {
			addTask,
			router
		} = this.props

		let {
			name,
			text
		} = this.state

		if (name !== '' && text !== '') {
			this.setState({ error : false })
			addTask({
				name, text
			})
			router.navigateToDefault()
		} else {
			this.setState({ error : true })
		}

	}

	onChangeNameTask = (e) => {
		const name = e.target.value
		this.setState({ name })
	}

	onChangeTextTask = (e) => {
		const text = e.target.value
		this.setState({ text })
	}

	render() {

		let {
			router
		} = this.props

		const osname = platform()

		return (
			<div>
                <PanelHeader
					left={
						<PanelHeaderBack
							onClick={()=>router.navigate('tasks')}
						/>
					}
				>
                Добавление
                </PanelHeader>
                <FormLayout>
					{
						this.state.error === true &&
						<FormStatus title="Некорректные поля" state="error">
							Заполните все поля
						</FormStatus>
					}
					<Input 
						onChange={this.onChangeNameTask}
						type='text'
						value={this.state.name}
						placeholder='Напиши, как называется задача' 
					/>
					<Textarea 
						onChange={this.onChangeTextTask}
						value={this.state.text}
						placeholder='Напиши, чтобы ты хотел сделать' />
				</FormLayout>
				<FixedLayout vertical='bottom'>
					{
						osname === ANDROID ? 
						<Div style={{ float : 'right' }}>
							<Button
								className='FixedBottomButton'
								onClick={(e) => this.onClickAddTask(e)}
							>
								<Icon24Done/>
							</Button>
						</Div>
						:
						<Div>
							<Button
								size='xl'
								onClick={(e) => this.onClickAddTask(e)}
							>
								Добавить
							</Button>
						</Div>
					}
				</FixedLayout>
            </div>
		);
	}
}

export default AddTask;
