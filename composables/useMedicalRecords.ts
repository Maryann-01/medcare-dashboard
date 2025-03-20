// composables/useMedicalRecords.ts
import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';

const ADD_MEDICAL_RECORD = gql`
  mutation AddMedicalRecord($input: MedicalRecordInput!) {
    addMedicalRecord(input: $input) {
      success
      message
    }
  }
`;

export const useMedicalRecords = () => {
  const { mutate: addMedicalRecord, onDone, onError } = useMutation(ADD_MEDICAL_RECORD, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    }
  });

  return {
    addMedicalRecord,
    onDone,
    onError
  };
};