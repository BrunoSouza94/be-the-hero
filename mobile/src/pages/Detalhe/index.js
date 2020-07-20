import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';

import styles from './styles';

import logo from '../../assets/logo.png';


export default function Casos(){
    const route = useRoute();
    const caso = route.params.caso;
    const navigation = useNavigation();
    const message = `Olá ${caso.nome}, estou entrando em contado para ajudar` +
    ` com o caso ${caso.titulo}, com o valor de` +
    ` ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(caso.valor)}`;
    


    function navigateToCasos(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Héroi do caso: ${caso.titulo}`,
            recipients: [`${caso.email}`],
            body: message
        });
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=55${caso.telefone}&&text=${message}`);
    }

    return(
        <View style={styles.container}>
             <View style={styles.header}>
                <Image source={logo} />
                <TouchableOpacity onPress={navigateToCasos}>
                    <Feather name="arrow-left" size={28} color='#E02041' />
                </TouchableOpacity>
            </View>

            
            <View style={styles.caso}>
                <Text style={[styles.casoProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.casoValor}>{caso.nome} - {caso.cidade}/{caso.uf}</Text>

                <Text style={styles.casoProperty}>Caso:</Text>
                <Text style={styles.casoValor}>{caso.titulo}</Text>

                <Text style={styles.casoProperty}>Valor:</Text>
                <Text style={styles.casoValor}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(caso.valor)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.contactTitle}>Salve o dia!</Text>
                <Text style={styles.contactTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.contactDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            </View>
            
        </View>
    )
}