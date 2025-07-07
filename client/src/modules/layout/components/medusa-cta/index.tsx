import { Text } from '@medusajs/ui';

import { FaStripe } from 'react-icons/fa';

const MedusaCTA = () => {
  return (
    <Text className="txt-compact-small-plus flex items-center gap-x-2">
      Powered by
      <FaStripe className="text-gray-500 " size={40} />
    </Text>
  );
};

export default MedusaCTA;
