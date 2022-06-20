import char from '~types/char'

type nil = null
type nul = null
type und = undefined
type str = string
type num = number
type boo = boolean
type sym = symbol
type big = bigint
type voi = void
type cha = char

type Nil = null
type Nul = null
type Und = undefined
type Str = string
type Num = number
type Boo = boolean
type Sym = symbol
type Big = bigint
type Voi = Void
type Cha = char

type l = null
type u = undefined
type s = string
type n = number
type b = boolean
type y = symbol
type g = bigint
type v = Void
type c = char

type L = null
type U = undefined
type S = string
type N = number
type B = boolean
type Y = symbol
type G = bigint
type V = Void
type C = char

type Char = char
type Void = void
type Null = null
type unk = unknown
type k = unknown
type K = unknown
type Unk = unknown
type Any = any
type a = any
type A = any

type åtom =
| null
| undefined
| string
| number
| boolean
| bigint
| char;

type å = åtom
type Å = åtom
type åto = åtom
type Åto = åtom
type Åtom = åtom

type molecule =
| åtom
| object;
type mol = molecule
type Mol = molecule
type M = molecule
type m = molecule

interface ClassicObject {
    [key: string]: molecule
}

type obj = ClassicObject
type Obj = ClassicObject
type O = ClassicObject
type o = ClassicObject

type rex = RegExp
type Rex = RegExp
type r = RegExp
type R = RegExp

export {
  nil, nul, und, str, num, boo, sym, big, voi, cha,
  l, u, s, n, b, y, g, v, c,
  Nil, Nul, Und, Str, Num, Boo, Sym, Big, Voi, Cha,
  L, U, S, N, B, Y, G, V, C,
  Char, Void, Null,
  k, K, unk, Unk,
  a, A, Any,
  å, Å, åto, Åtom,
  o, O, obj, Obj,
  m, M, mol, Mol,
  r, R, rex, Rex
}
export default åtom
