package main

import "fmt"

var deckSize int

func main() {
	card := []string{newCard(), "Ace of Diamonds"}

	deckSize = 55
	fmt.Println(deckSize)
	fmt.Println(card)
}

func newCard() string {
	return "Five of Diamonds"
}
