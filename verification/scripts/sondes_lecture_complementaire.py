import json
import statistics
import subprocess
from pathlib import Path


DESTINATION = Path(__file__).resolve().parents[1] / 'sondes-lecture-complementaire.json'


def signed_four_bits(value):
    word = value & 0b1111
    return word - 16 if word & 0b1000 else word


def main():
    result = subprocess.run(['mv', '-r', '--help'], capture_output=True, text=True, check=False)
    sample = [0, 1, 2, 2, 5]
    class_bounds = [(150, 160), (160, 170), (170, 180), (180, 190)]
    sum_word = 0b1111 + 0b1111
    observations = {
        'mv_r': {'exit_code': result.returncode, 'stderr_first_line': result.stderr.splitlines()[0] if result.stderr else ''},
        'four_bit_signed_addition': {'left': '1111', 'right': '1111', 'carry': sum_word >> 4, 'result': format(sum_word & 0b1111, '04b'), 'signed_result': signed_four_bits(sum_word)},
        'binary_msb_1010': {'position': int('1010', 2).bit_length() - 1},
        'conversion_512_kib_to_mib': 512 / 1024,
        'binary_mebibyte_per_second_in_decimal_megabits_per_second': 1024 * 1024 * 8 / 1000000,
        'class_containing_190': [f'[{lower},{upper}[' for lower, upper in class_bounds if lower <= 190 < upper],
        'asymmetric_sample_same_mean_and_median': {'sample': sample, 'mean': statistics.mean(sample), 'median': statistics.median(sample)},
        'one_instance_in_three_zones': {'allocations': [1, 0, 0], 'zones_with_instance': 1},
    }
    DESTINATION.write_text(json.dumps(observations, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'{len(observations)} contre-exemples enregistrés dans {DESTINATION}')


if __name__ == '__main__':
    main()
