import React, { useState, useEffect, createElement } from 'react';
// default
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchSubjects, postContact } from '../services/contact-api';
import { scrollToTop } from '../utils';

const Contact = () => {
    const [inputs, setInputs] = useState({
        RazaoSocial: '',
        Responsavel: '',
        Telefone: '',
        Email: '',
        Assunto: '',
        Mensagem: ''
    });
    const [result, setResult] = useState(null);

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        fetchSubjects()
            .then(result => {
                setSubjects(result.data.Data)
            });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        scrollToTop();

        const { RazaoSocial, Responsavel, Telefone, Email, Assunto, Mensagem } = inputs;

        postContact(RazaoSocial, Responsavel, Telefone, Email, Assunto, Mensagem)
            .then(result => {
                setResult({
                    success: true,
                    message: 'Sua mensagem foi enviada ao setor responsável.'
                });
                setInputs({
                    RazaoSocial: '',
                    Responsavel: '',
                    Telefone: '',
                    Email: '',
                    Assunto: '',
                    Mensagem: ''
                })
            })
            .catch(() => {
                setResult({
                    success: false,
                    message: 'Ocorreu um erro ao enviar a mensagem. Tente novamente!'
                });
            })
    }

    const onInputChange = event => {
        const { name, value } = event.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    };

    return (
        <>
            <Header />
            <section className="fale-conosco container">
                <div className="sect-header">
                    <div className="sect-titulo">
                        <h2 className="titulo h2">Fale Conosco</h2>
                    </div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-10 offset-1 fale-conosco-wrapper">
                        {result && (
                            <p className={`alert ${result.success ? 'alert-success' : 'alert-danger'}`} role="alert">
                                {result.message}
                            </p>
                        )}

                        <p className="fale-conosco--texto">Preencha o formulário abaixo que em breve entraremos em contato.</p>
                        <form className="form-fale-conosco" onSubmit={handleSubmit}>
                            <fieldset className="row">
                                <div className="col-12 col-lg-4">
                                    <label className="input-label" for="razao-social">Razão Social</label>
                                    <input onChange={onInputChange} required value={inputs.RazaoSocial} type="text" className="input" id="razao-social" name="RazaoSocial" placeholder="Preencha sua razão social" />
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <label className="input-label" for="responsavel">Responsável</label>
                                    <input onChange={onInputChange} required value={inputs.Responsavel} type="text" className="input" id="responsavel" name="Responsavel" placeholder="Nome completo" />
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <label className="input-label" for="telefone">Telefone</label>
                                    <input onChange={onInputChange} required value={inputs.Telefone} type="text" className="input" id="telefone" name="Telefone" placeholder="(21) 98898 9999" />
                                </div>
                            </fieldset>
                            <fieldset className="row">
                                <div className="col-12 col-md-6">
                                    <label className="input-label" for="email">E-mail </label>
                                    <input onChange={onInputChange} required value={inputs.Email} type="email" className="input" id="email" name="Email" placeholder="Seu e-mail" />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="input-label" for="assunto">Assunto</label>
                                    <label for="assunto" className="select">
                                        <select onChange={onInputChange} required name="Assunto" id="assunto">
                                            <option value="">Selecione um assunto</option>
                                            {subjects.map((subject, index) => (
                                                <option key={`opt-${index}`} value={subject}>{subject}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </fieldset>
                            <fieldset className="row">
                                <div className="col-12">
                                    <label className="input-label" for="mensagem">Mensagem</label>
                                    <textarea onChange={onInputChange} required name="Mensagem" className="input textarea" id="mensagem" rows="3">{inputs.Mensagem}</textarea>
                                </div>
                            </fieldset>
                            <fieldset className="row">
                                <div className="col-12 col-md-5 col-lg-3">
                                    <button type="submit" className="btn btn--laranja btn--full">Enviar</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>

                <div className="sect-footer align-items-start">
                    {/* <a href="" className="btn btn--cinza btn--block btn-full btn--bold">Voltar</a> */}
                    {createElement('a', { href: '/', className: "btn btn--cinza btn--block btn-full btn--bold" }, "Voltar")}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Contact;