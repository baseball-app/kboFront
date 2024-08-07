import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFunnel } from '../../hooks/useFunnel';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';

const SignUpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { Funnel, Step, setStep} = useFunnel('Step1');

    return (
        <View style={styles.container}>
            <Funnel>
                <Step name="Step1">
                    <Step1 nextStep={() => setStep('Step2')} />
                </Step>
                <Step name="Step2">
                    <Step2 nextStep={() => setStep('Step3')} prevStep={() => setStep('Step1')} />
                </Step>
                <Step name="Step3">
                    <Step3 nextStep={() => setStep('Step4')} prevStep={() => setStep('Step2')} />
                </Step>
                <Step name="Step4">
                    <Step4 prevStep={() => setStep('Step3')} />
                </Step>
            </Funnel>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SignUpScreen;
