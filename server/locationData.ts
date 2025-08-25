// Merchant location dataset for enriching transactions with map locations
// Minimal, focused mapping. Add more entries as needed.

export interface MerchantLocation {
  lat: number;
  lon: number;
  address: string;
}

export const MERCHANT_LOCATIONS: Record<string, MerchantLocation> = {
  // Paris
  "Galeries Lafayette Haussmann": { lat: 48.8738, lon: 2.3320, address: "40 Bd Haussmann, 75009 Paris, France" },
  "Café de Flore": { lat: 48.8553, lon: 2.3347, address: "172 Bd Saint‑Germain, 75006 Paris, France" },
  "L'Ami Jean": { lat: 48.8622, lon: 2.3039, address: "27 Rue Malar, 75007 Paris, France" },

  // Nice / Antibes / Côte d'Azur
  "Galeries Lafayette Nice": { lat: 43.7005, lon: 7.2706, address: "6 Av. Jean Médecin, 06000 Nice, France" },
  "La Petite Maison": { lat: 43.6956, lon: 7.2759, address: "11 Rue Saint‑François de Paule, 06300 Nice, France" },
  "Maison Auer": { lat: 43.6959, lon: 7.2751, address: "7 Rue Saint‑François de Paule, 06300 Nice, France" },
  "Plage Keller": { lat: 43.5619, lon: 7.1295, address: "Plage de la Garoupe, 06160 Antibes, France" },
  "Plage Keller Sunbeds": { lat: 43.5619, lon: 7.1295, address: "Plage de la Garoupe, 06160 Antibes, France" },
  "Boulangerie Veziano": { lat: 43.5819, lon: 7.1226, address: "2 Rue de la République, 06600 Antibes, France" },
  "Chez Pipo": { lat: 43.7028, lon: 7.2776, address: "13 Rue Bavastro, 06300 Nice, France" },
  "Monoprix Antibes": { lat: 43.5797, lon: 7.1222, address: "1 Bd Albert 1er, 06600 Antibes, France" },

  // Sardinia (Porto Cervo / Olbia)
  "Zuma Porto Cervo": { lat: 41.1359, lon: 9.5298, address: "Promenade du Port, 07021 Porto Cervo SS, Italy" },
  "Novikov Porto Cervo": { lat: 41.1369, lon: 9.5286, address: "Promenade du Port, 07021 Porto Cervo SS, Italy" },
  "Crazy Pizza Porto Cervo": { lat: 41.1364, lon: 9.5327, address: "Piazzetta degli Ulivi, 07021 Porto Cervo SS, Italy" },
  "Poltu Quatu at Phi Beach Club": { lat: 41.1215, lon: 9.4950, address: "Località Forte Cappellini, 07021 Arzachena SS, Italy" },
  "Phi Beach Restaurant": { lat: 41.1215, lon: 9.4946, address: "Località Forte Cappellini, 07021 Arzachena SS, Italy" },
  "Spinnaker Restaurant": { lat: 41.1428, lon: 9.5312, address: "Via Porto Vecchio, 07021 Porto Cervo SS, Italy" },
  "Beach Bar Grande Pevero": { lat: 41.1368, lon: 9.5202, address: "Grande Pevero Beach, 07021 Arzachena SS, Italy" },

  // Rome
  "Trattoria Luzzi": { lat: 41.8898, lon: 12.4955, address: "Via di S. Giovanni in Laterano, 88, 00184 Roma RM, Italy" },
  "CoopCulture Roma": { lat: 41.8902, lon: 12.4922, address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy" },
  "Aroma Restaurant": { lat: 41.8905, lon: 12.4941, address: "Via Labicana, 125, 00184 Roma RM, Italy" },
  "Caffè Sant'Eustachio": { lat: 41.8992, lon: 12.4746, address: "Piazza di S. Eustachio, 82, 00186 Roma RM, Italy" },
  "Street Food Roma": { lat: 41.8998, lon: 12.4769, address: "Piazza Navona area, Roma, Italy" },
  "Carrefour Express Roma": { lat: 41.9004, lon: 12.4768, address: "Corso Vittorio Emanuele II, 203, 00186 Roma RM, Italy" },
  "Taxi Roma FCO": { lat: 41.7946, lon: 12.2508, address: "Leonardo da Vinci–Fiumicino Airport, Rome, Italy" },

  // Sorrento / Amalfi Coast
  "Ristorante Il Buco": { lat: 40.6264, lon: 14.3737, address: "2ª Rampa Marina Piccola, 5, 80067 Sorrento NA, Italy" },
  "Fauno Bar": { lat: 40.6269, lon: 14.3755, address: "Piazza Torquato Tasso, 13, 80067 Sorrento NA, Italy" },
  "Taxi Sorrento": { lat: 40.6265, lon: 14.3750, address: "Piazza Torquato Tasso, Sorrento NA, Italy" },
  "Pasticceria Primavera": { lat: 40.6276, lon: 14.3756, address: "Corso Italia, 142, 80067 Sorrento NA, Italy" },
  "Al Palazzo": { lat: 40.6279, lon: 14.4884, address: "Via S. Sebastiano, 2, 84017 Positano SA, Italy" },
  "Arienzo Beach Club": { lat: 40.6191, lon: 14.4932, address: "Via Arienzo, 16, 84017 Positano SA, Italy" },
  "Bar Pasticceria Collina": { lat: 40.6284, lon: 14.4824, address: "Viale Pasitea, 12, 84017 Positano SA, Italy" },
  "La Sponda": { lat: 40.6276, lon: 14.4843, address: "Via Cristoforo Colombo, 30, 84017 Positano SA, Italy" },
  "Alilauro Hydrofoil": { lat: 40.6282, lon: 14.4865, address: "Positano Ferry Terminal, Italy" },

  // Naples / Pompeii
  "Suisse Pompei": { lat: 40.7480, lon: 14.4854, address: "Piazza Esedra, 8, 80045 Pompei NA, Italy" },
  "Bookshop Pompei Op. La": { lat: 40.7487, lon: 14.4869, address: "Scavi di Pompei, Pompei NA, Italy" },
  "Parco Archeologico di Pompei": { lat: 40.7485, lon: 14.4850, address: "Via Villa dei Misteri, 2, 80045 Pompei NA, Italy" },
  "Bar Napoli Centrale": { lat: 40.8522, lon: 14.2735, address: "Piazza Garibaldi, 80142 Napoli NA, Italy" },
  "Taxi Napoli Port → Aeroporto": { lat: 40.8518, lon: 14.2681, address: "Port of Naples, Italy" },
  "Uber Napoli": { lat: 40.852, lon: 14.268, address: "Naples, Italy" },

  // London
  "The Ivy Asia Mayfair": { lat: 51.5111, lon: -0.1430, address: "8-10 North Audley St, London W1K 6ZJ, UK" },
  "Harrods": { lat: 51.4991, lon: -0.1635, address: "87-135 Brompton Rd, London SW1X 7XL, UK" },
  "British Museum": { lat: 51.5194, lon: -0.1270, address: "Great Russell St, London WC1B 3DG, UK" },
  "British Museum Shop": { lat: 51.5194, lon: -0.1270, address: "Great Russell St, London WC1B 3DG, UK" },
  "Waitrose Park Lane": { lat: 51.5080, lon: -0.1504, address: "The Park Tower Knightsbridge, 101 Knightsbridge, London SW1X 7RQ, UK" },
  "Park Corner Brasserie": { lat: 51.5047, lon: -0.1526, address: "Hyatt Regency London - The Churchill, 30 Portman Square, London W1H 7BH, UK" },
  "White Horse Soho": { lat: 51.5126, lon: -0.1370, address: "16 Newburgh St, Carnaby, London W1F 7RY, UK" },
  "Be At One Islington": { lat: 51.5353, lon: -0.1028, address: "66-68 Essex Rd, London N1 8LR, UK" },
  "Dishoom Carnaby": { lat: 51.5139, lon: -0.1407, address: "22 Kingly St, Carnaby, London W1B 5QP, UK" },
  "Pret A Manger Strand": { lat: 51.5101, lon: -0.1210, address: "Unit 4, Villiers St, London WC2N 6NA, UK" },
  "Notes Coffee": { lat: 51.5095, lon: -0.1235, address: "Trafalgar Square, London WC2N, UK" },
  "Parcafé Dorchester": { lat: 51.5071, lon: -0.1576, address: "53 Park Ln, London W1K 1QA, UK" },
  "Tesco Express": { lat: 51.5131, lon: -0.1310, address: "Oxford St area, London, UK" },
  "Costa Coffee Oxford Street": { lat: 51.5156, lon: -0.1422, address: "Oxford St, London W1, UK" },
  "Starbucks Oxford Street": { lat: 51.5158, lon: -0.1419, address: "Oxford St, London W1, UK" },
  "Starbucks Victoria Station": { lat: 51.4952, lon: -0.1449, address: "Victoria Station, London SW1V, UK" },
  "Gail's Bakery Hampstead": { lat: 51.5564, lon: -0.1785, address: "64 Hampstead High St, London NW3 1QH, UK" },
  "Flat Whites Winchester": { lat: 51.0629, lon: -1.3160, address: "5A Middle Brook St, Winchester SO23 8AQ, UK" },
  "Leckford Farm Shop Café": { lat: 51.1778, lon: -1.4531, address: "A3057, Stockbridge SO20 6EH, UK" },
  "BP Express Finchley Road": { lat: 51.5491, lon: -0.1802, address: "Finchley Rd, London NW3, UK" },
  "WHSmith Heathrow T2": { lat: 51.4716, lon: -0.4520, address: "Terminal 2, Heathrow Airport, Hounslow TW6, UK" },
  "South Western Railway": { lat: 51.4653, lon: -0.1647, address: "Clapham Junction, London, UK" },
  "Transport for London": { lat: 51.5033, lon: -0.1195, address: "London, UK" },

  // Dublin
  "The Temple Bar Pub": { lat: 53.3455, lon: -6.2642, address: "47-48 Temple Bar, Dublin, D02 N725, Ireland" },
  "FREE NOW Dublin": { lat: 53.3498, lon: -6.2603, address: "Dublin, Ireland" },
  "Guinness Storehouse": { lat: 53.3419, lon: -6.2860, address: "St James's Gate, Dublin 8, Ireland" },
  "Gravity Bar Guinness": { lat: 53.3425, lon: -6.2864, address: "St James's Gate, Dublin 8, Ireland" },
  "Butlers Café": { lat: 53.3491, lon: -6.2604, address: "Dublin 1, Ireland" },
  "Butlers Chocolate Café": { lat: 53.3491, lon: -6.2604, address: "Dublin 1, Ireland" },
  "Spar": { lat: 53.3440, lon: -6.2672, address: "Dublin 2, Ireland" },
  "The Brazen Head": { lat: 53.3437, lon: -6.2765, address: "20 Lower Bridge St, The Liberties, Dublin, D08 WC64, Ireland" },
  "The Stag's Head": { lat: 53.3432, lon: -6.2625, address: "1 Dame Ct, Dublin, Ireland" },
  "The Church Café Bar": { lat: 53.3489, lon: -6.2675, address: "Mary St, Dublin 1, Ireland" },
  "Circle K Athlone": { lat: 53.4237, lon: -7.9386, address: "N6, Athlone, Co. Westmeath, Ireland" },

  // Others
  "Artesian Marylebone": { lat: 51.5204, lon: -0.1527, address: "1 Chiltern St, London W1U, UK" },
  "Boots": { lat: 51.5122, lon: -0.1410, address: "Oxford St, London, UK" },
};
