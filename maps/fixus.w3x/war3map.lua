gg_rct_Pen = nil
function InitGlobals()
end

function CreateNeutralPassive()
    local p = Player(PLAYER_NEUTRAL_PASSIVE)
    local u
    local unitID
    local t
    local life
    u = BlzCreateUnitWithSkin(p, FourCC("nshf"), -258.8, -849.1, 198.530, FourCC("nshf"))
end

function CreatePlayerBuildings()
end

function CreatePlayerUnits()
end

function CreateAllUnits()
    CreatePlayerBuildings()
    CreateNeutralPassive()
    CreatePlayerUnits()
end

function CreateRegions()
    local we
    gg_rct_Pen = Rect(-640.0, -1280.0, 128.0, -448.0)
end

function InitCustomPlayerSlots()
    SetPlayerStartLocation(Player(0), 0)
    SetPlayerColor(Player(0), ConvertPlayerColor(0))
    SetPlayerRacePreference(Player(0), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(0), true)
    SetPlayerController(Player(0), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(1), 1)
    SetPlayerColor(Player(1), ConvertPlayerColor(1))
    SetPlayerRacePreference(Player(1), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(1), true)
    SetPlayerController(Player(1), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(2), 2)
    SetPlayerColor(Player(2), ConvertPlayerColor(2))
    SetPlayerRacePreference(Player(2), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(2), true)
    SetPlayerController(Player(2), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(3), 3)
    SetPlayerColor(Player(3), ConvertPlayerColor(3))
    SetPlayerRacePreference(Player(3), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(3), true)
    SetPlayerController(Player(3), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(4), 4)
    SetPlayerColor(Player(4), ConvertPlayerColor(4))
    SetPlayerRacePreference(Player(4), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(4), true)
    SetPlayerController(Player(4), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(5), 5)
    SetPlayerColor(Player(5), ConvertPlayerColor(5))
    SetPlayerRacePreference(Player(5), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(5), true)
    SetPlayerController(Player(5), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(6), 6)
    SetPlayerColor(Player(6), ConvertPlayerColor(6))
    SetPlayerRacePreference(Player(6), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(6), true)
    SetPlayerController(Player(6), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(7), 7)
    SetPlayerColor(Player(7), ConvertPlayerColor(7))
    SetPlayerRacePreference(Player(7), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(7), true)
    SetPlayerController(Player(7), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(8), 8)
    SetPlayerColor(Player(8), ConvertPlayerColor(8))
    SetPlayerRacePreference(Player(8), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(8), true)
    SetPlayerController(Player(8), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(9), 9)
    SetPlayerColor(Player(9), ConvertPlayerColor(9))
    SetPlayerRacePreference(Player(9), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(9), true)
    SetPlayerController(Player(9), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(10), 10)
    SetPlayerColor(Player(10), ConvertPlayerColor(10))
    SetPlayerRacePreference(Player(10), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(10), true)
    SetPlayerController(Player(10), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(11), 11)
    SetPlayerColor(Player(11), ConvertPlayerColor(11))
    SetPlayerRacePreference(Player(11), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(11), true)
    SetPlayerController(Player(11), MAP_CONTROL_USER)
end

function InitCustomTeams()
    SetPlayerTeam(Player(0), 0)
    SetPlayerTeam(Player(1), 0)
    SetPlayerTeam(Player(2), 0)
    SetPlayerTeam(Player(3), 0)
    SetPlayerTeam(Player(4), 0)
    SetPlayerTeam(Player(5), 0)
    SetPlayerTeam(Player(6), 0)
    SetPlayerTeam(Player(7), 0)
    SetPlayerTeam(Player(8), 0)
    SetPlayerTeam(Player(9), 0)
    SetPlayerTeam(Player(10), 0)
    SetPlayerTeam(Player(11), 0)
end

function InitAllyPriorities()
    SetStartLocPrioCount(0, 2)
    SetStartLocPrio(0, 0, 1, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(0, 1, 5, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(1, 2)
    SetStartLocPrio(1, 0, 0, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(1, 1, 9, MAP_LOC_PRIO_LOW)
    SetStartLocPrioCount(2, 2)
    SetStartLocPrio(2, 0, 4, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(2, 1, 10, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(3, 2)
    SetStartLocPrio(3, 0, 9, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(3, 1, 11, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(4, 2)
    SetStartLocPrio(4, 0, 2, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(4, 1, 11, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(5, 2)
    SetStartLocPrio(5, 0, 0, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(5, 1, 7, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(6, 2)
    SetStartLocPrio(6, 0, 7, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(6, 1, 8, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(7, 2)
    SetStartLocPrio(7, 0, 5, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(7, 1, 6, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(8, 2)
    SetStartLocPrio(8, 0, 6, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(8, 1, 10, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(9, 2)
    SetStartLocPrio(9, 0, 1, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(9, 1, 3, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(10, 2)
    SetStartLocPrio(10, 0, 2, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(10, 1, 8, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(11, 2)
    SetStartLocPrio(11, 0, 3, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(11, 1, 4, MAP_LOC_PRIO_LOW)
end

function main()
    SetCameraBounds(-5760.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), -5760.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM), 5504.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), 4352.0 - GetCameraMargin(CAMERA_MARGIN_TOP), -5760.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), 4352.0 - GetCameraMargin(CAMERA_MARGIN_TOP), 5504.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), -5760.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM))
    SetDayNightModels("Environment\\DNC\\DNCLordaeron\\DNCLordaeronTerrain\\DNCLordaeronTerrain.mdl", "Environment\\DNC\\DNCLordaeron\\DNCLordaeronUnit\\DNCLordaeronUnit.mdl")
    NewSoundEnvironment("Default")
    SetAmbientDaySound("LordaeronSummerDay")
    SetAmbientNightSound("LordaeronSummerNight")
    SetMapMusic("Music", true, 0)
    CreateRegions()
    CreateAllUnits()
    InitBlizzard()
    InitGlobals()
end

function config()
    SetMapName("TRIGSTR_4910")
    SetMapDescription("TRIGSTR_4912")
    SetPlayers(12)
    SetTeams(12)
    SetGamePlacement(MAP_PLACEMENT_TEAMS_TOGETHER)
    DefineStartLocation(0, -896.0, -1216.0)
    DefineStartLocation(1, -640.0, -1536.0)
    DefineStartLocation(2, 384.0, -384.0)
    DefineStartLocation(3, 256.0, -1536.0)
    DefineStartLocation(4, 384.0, -768.0)
    DefineStartLocation(5, -896.0, -832.0)
    DefineStartLocation(6, -704.0, -192.0)
    DefineStartLocation(7, -896.0, -512.0)
    DefineStartLocation(8, -320.0, -192.0)
    DefineStartLocation(9, -128.0, -1600.0)
    DefineStartLocation(10, 64.0, -192.0)
    DefineStartLocation(11, 384.0, -1216.0)
    InitCustomPlayerSlots()
    SetPlayerSlotAvailable(Player(0), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(1), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(2), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(3), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(4), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(5), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(6), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(7), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(8), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(9), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(10), MAP_CONTROL_USER)
    SetPlayerSlotAvailable(Player(11), MAP_CONTROL_USER)
    InitGenericPlayerSlots()
    InitAllyPriorities()
end

