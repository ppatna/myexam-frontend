import React from 'react'
import {FormControl,InputGroup,Button , Form,Card} from 'react-bootstrap'
import _ from 'lodash'
import jsonfile from '../pages/data.json'
import moment from 'moment';
import localization from 'moment/locale/th';


const STATE = ['home','pokemon','function1','function2','function3']
const START_STATE = 'home'
class Pokemon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            activeState : START_STATE ,
            formDetail : {
                fristName : {
                    iptType : 'input',
                    validation : 'Please fill out this field'
                },
                lastName : {
                    iptType : 'input',
                    validation : 'Please fill out this field'
                },
                email : {
                    iptType : 'input',
                    validation : 'Please fill out this field'
                },
                password : {
                    iptType : 'input',
                    validation : 'Please fill out this field'
                }
            },
            detailValue : {
                fristName : null,
                lastName : null,
                email : null,
                password : null

            },
            arrayNumber : [[],[1],[1,2,3],[1,1],[1,2,3,4,5,6],[1,5,3,2,5,10],[100,5,3,2,99],[35,5,3,2,5,100],[1,5,101,2,5,10],[10,10,9]],
            subArrayNumber : [],
            isCheckValue : false,
            Json : jsonfile,
            dataJson : [],
            sumPrice : 0,
            product : [{name : 'Wow product',totalSubProductWeight: 0}]
        }
    }

    componentDidMount() {
       this.fetchDataJson()
        for(let i = 1 ;i < 105 ; i++){
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`,{method: 'GET'}).then(response => response.json())
          .then(result => {
          const { data} = this.state
            const listmenu = [...data]
                  listmenu.push({name : result.name,image : result.sprites.front_default})
                this.setState({
                      data: listmenu
                  })  
          })
          }
    }

    fetchDataJson =() =>{
       const {Json,dataJson} = this.state
       const listmenu = [...dataJson]
       _.map(Json ,(eachV, idx) => {
            if(!eachV.is_editable_price) {
                _.map(eachV.products,(valueProduct,keyProduct) =>{
                    listmenu.push({name : valueProduct.name, weight: valueProduct.weight})
                    this.setState({
                        dataJson: listmenu
                    })  

                })
            }
       })
    }

    handleActivestate = (act) =>{
        const {arrayNumber,subArrayNumber} = this.state
        const listmenu = [...subArrayNumber]
        if(act === 'function1'){
            const {dataJson} = this.state
            let sumPrice = 0
            _.map(dataJson,(eachV,idx) =>{
                sumPrice += eachV.weight
            })
            this.setState({
                sumPrice  :sumPrice      
            })
        }else if(act === 'function3'){
            _.map(arrayNumber,(eachV,idx)=>{
                if(eachV.length === 0 ){
                    listmenu.push('null')
                }else if(eachV.length === 1){
                    listmenu.push(eachV.toString())
                }else if(eachV.length > 1){
                    let number = 0
                    _.map(eachV,(eachVInArray,eachKInArray)=>{
                                if(eachVInArray < eachV[eachKInArray +1 ] ){
                                    number = eachVInArray
                                }else if(eachVInArray === eachV[eachKInArray +1 ] ) {
                                    number = eachVInArray
                                } 
                                else if(eachVInArray > eachV[eachKInArray +1 ] && eachVInArray < eachV[eachKInArray +1 ]){
                                    number = eachVInArray
                                }
                    })
                    listmenu.push(number)
                    this.setState({
                        subArrayNumber  :listmenu      
                    })

                }
            })
            this.setState({
                subArrayNumber  :listmenu      
            })
        }
        this.setState({activeState : act})
    }
    handleSumit = (e) =>{
        e.preventDefault()
          this.setState({
            isCheckValue : true
          })
    }
    handleValueState =(e,eachK)=>{
        const {detailValue} = this.state
        detailValue[eachK] = e
        this.setState({
            detailValue
        })

    }

    handleHome = () =>{
        const {formDetail,detailValue,isCheckValue} = this.state
        return <div className="form-custom">
            <Form noValidate validated ={true}>
            {_.map(formDetail,(eachV , eachK) => {
                    return <Form.Group md="6" controlId="validationFormik03">
                    <Form.Label>{eachK}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="" required
                      onChange={e => this.handleValueState(e.target.value ,eachK)}
                    />
      
                    <Form.Control.Feedback type="invalid">
                      {eachV.validation}
                    </Form.Control.Feedback>
                  </Form.Group>
            })} 
            
            <Button variant="primary" type="submit" onClick={e=> this.handleSumit(e)}>
                Submit
            </Button>
            </Form>
            {isCheckValue ? <div>
                {_.map(detailValue,(eachV,eachK) =>{
                    return <p>{eachV}</p> 
                })}
            </div> : null }
        </div>
    }
    handlePokemon = () =>{
        const {data} = this.state
        return <div className="myCenter"><div className="pokemon-row">
        <h2><center>Test fetch API</center></h2>
        {data.map((eachV,eachK) => {
    
        return <div className="pokemon-col">
            <img src={eachV.image}></img><br></br>
            <div className="pokemon-name">{eachV.name}</div>
            </div>
        })}
       </div> </div>
    }

    handleFunction1 = ()=>{ 
       const {dataJson,sumPrice} = this.state
        return <div className="myCenterA">
            {_.map(dataJson ,(eachV,eachK)=>{
                return <p><label>Name : </label><label> {eachV.name}</label></p>
            })}

            <p><label>totalSubProductWeight :</label><label>{sumPrice}</label></p>

        </div>
       
    }

    handleFunction2 = ()=>{
        var dateInEpochTS = '2020-08-10T14:54:52+07:00'
        var dateNumber = moment(dateInEpochTS).format('DD/MM/YYYY HH:mm');
        moment.locale('th');
        var dateThai = moment(dateInEpochTS).add(543, 'year').format('LL');
        var countMonth = moment("2020-08", "YYYY-MM").daysInMonth();
        var quarterOfMonth = moment(dateInEpochTS).quarter();
        var Unixtimestamp = moment(dateInEpochTS).unix();
        return <div className="myCenterA">
            <p>2020-08-10T14:54:52+07:00</p>
        <p>{dateNumber}</p>
        <p>{dateThai}</p>
        <p>{countMonth}</p>
        <p>{quarterOfMonth}</p>
        <p>{Unixtimestamp}</p>
        </div>
    }

    handleFunction3 = ()=>{
        const {subArrayNumber} = this.state
        return <div className="myCenterA">
            {_.map(subArrayNumber ,(eachV,eachK)=>{
                return <p><label>{eachV}</label></p>
                })}
        </div>
    }

    render() {
        const { data , activeState ,subArrayNumber} = this.state
        return (
        <div>
            <Card>
            <Card.Body>
                <div className="btn-center">
                <Button variant="success" onClick={e => this.handleActivestate('home')} >Home</Button>{' '}
                <Button variant="secondary" onClick={e => this.handleActivestate('pokemon')} >Pokemon</Button>{' '}
                <Button variant="info" onClick={e => this.handleActivestate('function1')}>Function1</Button>{' '}
                <Button variant="warning" onClick={e => this.handleActivestate('function2')}>Function2</Button>{' '}
                <Button variant="danger" onClick={e => this.handleActivestate('function3')}>Function3</Button>{' '}
                </div>
            {activeState === 'home' ? this.handleHome() : null}
            {activeState === 'pokemon' ?  this.handlePokemon() : null}
            {activeState === 'function1' ?  this.handleFunction1() : null}
            {activeState === 'function2' ?  this.handleFunction2() : null}
            {activeState === 'function3' ?  this.handleFunction3() : null}
            </Card.Body>
            </Card>
            
            
        </div>
       )}
}

export default Pokemon;


