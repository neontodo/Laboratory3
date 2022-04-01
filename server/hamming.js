function decode(bits) {
	var position_error=0;
	var z4=0;
	var z3=0;
	var z2=0;
	var z1=0;
	var z0=0;
	var error_d=false;
	var error_c=false;
	var parityb=bits.par;
	var nr_bits=bits.numberOfDataBits;
	var bits=bits.bits;
    //check wether we work with 4/8 bits
if (nr_bits == 4) {
		if (parityb == 0) {
			z3=parity(bits[3]+bits[4]+bits[5]+bits[6]);
			z2=parity(bits[1]+bits[2]+bits[5]+bits[6]);
			z1=parity(bits[0]+bits[2]+bits[4]+bits[6]);
			position_error=z1*1+z2*2+z3*4;

			if (position_error != 0){
				error_d=true;
				error_c=true;
				bits[position_error-1]=parity(bits[position_error]);
			}
		} else {
			z3=parity(bits[4]+bits[5]+bits[6]+bits[7]);
			z2=parity(bits[2]+bits[3]+bits[6]+bits[7]);
			z1=parity(bits[1]+bits[3]+bits[5]+bits[7]);
			z0=parity(bits[0]+bits[1]+bits[2]+bits[3]+bits[4]+bits[5]+bits[6]+bits[7]);
			position_error=z1*1+z2*2+z3*4;
			
			if (position_error != 0) {
				error_d=true;	
				error_c=true;
				bits[position_error] = parity(bits[position_error]);
			}
		}
	} else if (nr_bits == 8) {
		if (parityb == 0) {
			z3=parity(bits[7]+bits[8]+bits[9]+bits[10]);
			z2=parity(bits[3]+bits[4]+bits[5]+bits[6]+bits[11]);
			z1=parity(bits[1]+bits[2]+bits[5]+bits[6]+bits[9]+bits[10]);
			z0=parity(bits[0]+bits[2]+bits[4]+bits[6]+bits[8]+bits[10]);
			position_error=z0*1+z1*2+z2*4+z3*8;
			
			if (position_error!=0) {
				error_c=true;
				bits[position_error-1]=parity(bits[position_error-1]+1);
			}
		} else {
			z4=parity(bits[8]+bits[9]+bits[10]+bits[11]);
			z3=parity(bits[4]+bits[5]+bits[6]+bits[7]+bits[12]);
			z2=parity(bits[2]+bits[3]+bits[6]+bits[7]+bits[10]+bits[11]);
			z1=parity(bits[1]+bits[3]+bits[5]+bits[7]+bits[9]+bits[11]);
			z0=parity(bits[0]+bits[1]+bits[2]+bits[3]+bits[4]+bits[5]+bits[6]+bits[7]+bits[8]+bits[9]+bits[10]+bits[11]);
			position_error=z1*1+z2*2+z3*4+z4*8;
			
			if (position_error != 0) {
				error_d=true;
				error_c=true;
				bits[position_error]=parity(bits[position_error]);
			}
		}
	}
	return {error_c: error_c, error_d: error_d, position_error: position_error - 1, bits: bits };
}

parity = function(number){
	return number % 2;
}

exports.decode = decode;
